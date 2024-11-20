*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}         http://localhost:3000/
${MENU_ITEM}   Latte
${MENU_ITEM_NEXTPAGE}   Pinky Milk
${EXPECTED_COUNT_ALL}  47
${POPUP_MESSAGE}  Item added to cart successfully!
${DELAY}    1s
${MAX_PAGES}      3
${TIMEOUT}        5s

*** Keywords ***
Open Browser To Website
    [Documentation]  Open the browser and navigate to the website.
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Verify All Items Show
    [Arguments]    ${expected_count}
    [Documentation]  Checks that the displayed matching count equals the provided expected value.
    Wait Until Element Is Visible    id=matchedNumber    timeout=5s
    ${count}=    Get Text    id=matchedNumber
    Should Be Equal As Numbers    ${count}    ${expected_count}

Scroll Down
    [Documentation]  Scrolls down to make the product card with the specified title visible on the screen.
    Wait Until Element Is Visible    id=Card    timeout=5s
    Execute JavaScript    document.getElementById('CardTitle').scrollIntoView();

Click Plus Button
    [Documentation]  Finds the card with the specified menu item title and clicks the + button.
    Wait Until Element Is Visible    xpath=//div[@id="Card" and .//h3[@id="CardTitle" and text()="${MENU_ITEM}"]]    timeout=5s
    Click Element    xpath=//div[@id="Card" and .//h3[@id="CardTitle" and text()="${MENU_ITEM}"]]//button[@id="Addbtn"]

Click Plus Button NEXT PAGE
    [Documentation]  Finds the card with the specified menu item title and clicks the + button.
    Wait Until Element Is Visible    xpath=//div[@id="Card" and .//h3[@id="CardTitle" and text()="${MENU_ITEM_NEXTPAGE}"]]    timeout=5s
    Click Element    xpath=//div[@id="Card" and .//h3[@id="CardTitle" and text()="${MENU_ITEM_NEXTPAGE}"]]//button[@id="Addbtn"]

Select Multiple Add-Ons
    [Documentation]  Selects multiple add-ons: Oat milk and Brown Sugar Jelly.
    Wait Until Element Is Visible    id=description-page    timeout=3s
    Click Element    xpath=//button[text()='Cold']
    Sleep    ${DELAY}
    Wait Until Element Is Visible    id=Options    timeout=1s
    Click Element    xpath=//button[contains(text(), 'Oat Milk')]
    Sleep    ${DELAY}
    Click Element    xpath=//button[contains(text(), 'Brown Sugar Jelly')]
    Sleep    ${DELAY}
    Click Element    xpath=//button[text()='100%']
    Sleep    ${DELAY}

Not Select Add-Ons
    [Documentation]  Selects only temperature and sugar level options without any additional add-ons.
    Wait Until Element Is Visible    id=description-page    timeout=3s
    Click Element    xpath=//button[text()='Cold']
    Sleep    ${DELAY}
    Click Element    xpath=//button[text()='100%']
    Sleep    ${DELAY}

Add To Cart
    [Documentation]  Clicks the "Add to Cart" button to add the selected item to the cart.
    Click Element    xpath=//button[text()='Add to Cart']
    Sleep    ${DELAY}

Check Popup Success
    [Documentation]  Verifies that the pop-up message appears and matches the expected text.
    Wait Until Element Is Visible    xpath=//p[contains(text(), '${POPUP_MESSAGE}')]    timeout=5s
    ${popup_text}=    Get Text    xpath=//p[contains(text(), '${POPUP_MESSAGE}')]
    Should Be Equal    ${popup_text}    ${POPUP_MESSAGE}
    Sleep    ${DELAY}
    Click Element    xpath=//button[text()='Close']
    Sleep    ${DELAY}

Scroll To Pagination And Click Next
    [Documentation]  Scrolls to the pagination section and clicks the next page button.
    Sleep    ${DELAY}
    Execute JavaScript    document.getElementById('Pagination').scrollIntoView();
    Sleep    ${DELAY}
    Wait Until Element Is Visible    id=Pagination    timeout=${TIMEOUT}
    Sleep    ${DELAY}
    Wait Until Element Is Visible    xpath=//li[@aria-label="next page button"]    timeout=${TIMEOUT}
    Sleep    ${DELAY}
    Click Element    xpath=//li[@aria-label="next page button"]
    Sleep    ${DELAY}

Select Add-Ons
    [Documentation]  Selects only temperature and sugar level options without any additional add-ons.
    Wait Until Element Is Visible    id=description-page    timeout=3s
    Click Element    xpath=//button[text()='Cold']
    Sleep    ${DELAY}
    Click Element    xpath=//button[text()='100%']
    Sleep    ${DELAY}

*** Test Cases ***
Test Valid Menu Item Search And Add To Cart
    Open Browser To Website
    Maximize Browser Window
    Verify All Items Show    ${EXPECTED_COUNT_ALL}
    Scroll Down
    Click Plus Button
    Select Multiple Add-Ons
    Add To Cart
    Check Popup Success
    Close Browser

# Test Non Select Adding Add Ons For Drinks 
#     Open Browser To Website
#     Maximize Browser Window
#     Verify All Items Show    ${EXPECTED_COUNT_ALL}
#     Scroll Down
#     Click Plus Button
#     Not Select Add-Ons
#     Add To Cart
#     Check Popup Success
#     Close Browser

Test Non Select Adding Add Ons For Drinks IN NEXT PAGE
    Open Browser To Website
    Maximize Browser Window
    Verify All Items Show    ${EXPECTED_COUNT_ALL}
    ${current_page}=    Set Variable    1
    FOR    ${i}    IN RANGE    1    ${MAX_PAGES}  # Corrected loop declaration
        Scroll Down        
        ${item_found}=    Run Keyword And Return Status    Wait Until Element Is Visible    xpath=//h3[@id="CardTitle" and text()="${MENU_ITEM_NEXTPAGE}"]    timeout=${TIMEOUT}
        Run Keyword If    ${item_found}    Click Plus Button NEXT PAGE
        Run Keyword If    not ${item_found}    Scroll To Pagination And Click Next
    END
    Select Add-Ons
    Add To Cart
    Check Popup Success
    Close Browser






