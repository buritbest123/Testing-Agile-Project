*** Settings ***
Library    SeleniumLibrary
Suite Teardown    Close Browser

*** Variables ***
${browser}       Chrome
# ${bash_url}      http://localhost:3000/
${bash_url}      http://10.34.112.130:3000/

${homepage}    css:body > main
${search_bar}    css:#searchInput
${search_result_container}    css:body > main > div.homepage_cardContainer__wrHEN
${menus}    css:#CardTitle

${search_keyword}    Cream Cheese Danish

${describtion_container}    css:#description-page

*** Test Cases ***
Test opening browser
    Open Browser    ${bash_url}    ${browser}

Search Cream Cheese Danish
# When searching Cream Cheese Danish, check the search result if the menu result contain the key word Cream Cheese Danish or not
    Input Text    ${search_bar}    ${search_keyword}
    Wait Until Element Is Visible    ${search_result_container}
    ${menus} =    Get WebElements    ${search_result_container} >> ${menus}
    FOR    ${item}    IN    @{menus}
        ${menu_title}=    Get Text    ${item}
        Should Contain    ${menu_title.lower()}    ${search_keyword.lower()}
    END

Select Cream Cheese Danish
# After click to select Cream Cheese Danish, it should show Cream Cheese Danish as the tile
    ${menus}=    Get WebElements    ${search_result_container} >> ${menus}
    FOR    ${item}    IN    @{menus}
        ${menu_title}=    Get Text    ${item}
        ${is_match}=    Evaluate    '${search_keyword.lower()}' in '${menu_title.lower()}'
        Run Keyword If    ${is_match}    Add Item To Cart    ${item}
        Exit For Loop If    ${is_match}
    END

    Wait Until Page Contains Element    ${describtion_container}
    ${menu_title}=    Get Text    css:#description-page > div > h1
    Should Contain    ${menu_title.lower()}    ${search_keyword.lower()}

Add Cream Cheese Danish To Cart
    ${addCart_button}=    Get WebElement    css:#description-page > div > div > button
    Click Element    ${addCart_button}
    ${successful_container}=    Get WebElement    css:body > main > div.description_modal-overlay__pwguD > div
    Wait Until Element Is Visible    ${successful_container}
    ${successful_text}=    Get Text    css:body > main > div.description_modal-overlay__pwguD > div > p
    Should Contain    ${successful_text}    Item added to cart successfully!

Navigate Back To Homepage After Add Cream Cheese Danish
    ${close_button}=    Get WebElement    css:body > main > div.description_modal-overlay__pwguD > div > button
    Click Element    ${close_button}
    Wait Until Page Contains Element    ${homepage}
    Element Should Be Visible    ${homepage}

Cream Cheese Danish Added In Cart
    ${cart_button}=    Get WebElement    css:body > main > main > header > ul > li:nth-child(1)
    Click Element    ${cart_button}

    Wait Until Page Contains Element    css:body > main > div.cartPage_miscContainer__RltQF

    ${item_title}=    Get Text    css:body > main > div.cartPage_itemContainer__Tuk8W > div > div.CartItem_itemInfo__Z5gbv > h3
    Should Contain    ${item_title}    Cream Cheese Danish

*** Keywords ***
Add Item To Cart
    [Arguments]    ${item}
    ${add_button}=    Get WebElement    css:#Card > a > div.Card_cardAddToCart__ji65r
    Click Element    ${add_button}