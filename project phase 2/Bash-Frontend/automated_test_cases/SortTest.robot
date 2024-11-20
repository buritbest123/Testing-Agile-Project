*** Settings ***
Library    SeleniumLibrary
Library    String
Library    BuiltIn
Library    Collections

*** Variables ***
${URL}                 http://localhost:3000/
${SORT_BUTTON}         //select
${PRICE_LOW_TO_HIGH}   //select/option[@value='Price Low to High' and text()='Price, low to high']
${PRICE_HIGH_TO_LOW}   //select/option[@value='Price High to Low' and text()='Price, high to low']
${PRODUCT_PRICE}       //*[@class="homepage_cardContainer__wrHEN"]//*[@class="Card_cardPrice__pajUN"]//span[position()=last()]

*** Keywords ***
Open Browser To Website
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Select Sort by Price Low to High
    Click Element    ${SORT_BUTTON}
    Click Element    ${PRICE_LOW_TO_HIGH}

Select Sort by Price High to Low
    Click Element    ${SORT_BUTTON}
    Click Element    ${PRICE_HIGH_TO_LOW}

Get Product Prices As Numbers
    Scroll Element Into View    ${PRODUCT_PRICE}
    ${elements}=    Get WebElements    ${PRODUCT_PRICE}   # Retrieve all elements matching the PRODUCT_PRICE location
    ${prices}=      Create List
    FOR    ${element}    IN    @{elements}
        ${price_text}=    Get Text    ${element}
        ${cleaned_price}=    Process Price Text    ${price_text}
        Run Keyword If    ${cleaned_price} is not None    Append To List    ${prices}    ${cleaned_price}
    END
    Log To Console    ${prices}
    [Return]    ${prices}

Process Price Text
    [Arguments]    ${price_text}
    ${cleaned_text}=    Remove String        ${price_text}   .   -    # Remove the trailing ".-"
    # ${number}=    Convert To Number    ${cleaned_text}
    [Return]    ${cleaned_text}    # Return the price

Verify Prices Sorted In Ascending Order
    ${sorted_prices}=    Get Product Prices As Numbers   
    ${expected_sorted_prices}=    Create List    10    18    25   30    45    45    45    45    45    50
    Should Be Equal   ${expected_sorted_prices}    ${sorted_prices}
    

Verify Prices Sorted In Descending Order
    ${sorted_prices}=    Get Product Prices As Numbers   
    ${expected_sorted_prices}=    Create List    120    90    90    85    70    70    70    70    70    70
    Should Be Equal   ${expected_sorted_prices}    ${sorted_prices}

*** Test Cases ***
Test Sort by Price from Low to High
    Open Browser To Website
    Wait Until Element Is Visible    id=Card    timeout=10s
    Select Sort by Price Low to High
    Verify Prices Sorted In Ascending Order  
    Close Browser

Test Sort by Price from High to Low
    Open Browser To Website
    Wait Until Element Is Visible    id=Card    timeout=10s
    Select Sort by Price High to Low
    Verify Prices Sorted In Descending Order
    Close Browser
