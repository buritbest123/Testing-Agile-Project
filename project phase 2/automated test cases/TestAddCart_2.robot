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

${search_keyword}    Orange Matcha
${search_keyword_2}    Donut

${describtion_container}    css:#description-page

*** Test Cases ***
Test opening browser
    Open Browser    ${bash_url}    ${browser}

Search Orange Matcha
# When searching Orange Matcha, check the search result if the menu result contain the key word Orange Matcha or not
    Input Text    ${search_bar}    ${search_keyword}
    Wait Until Element Is Visible    ${search_result_container}
    ${menus} =    Get WebElements    ${search_result_container} >> ${menus}
    FOR    ${item}    IN    @{menus}
        ${menu_title}=    Get Text    ${item}
        Should Contain    ${menu_title.lower()}    ${search_keyword.lower()}
    END

Select Orange Matcha
# After click to select Orange Matcha, it should show Orange Matcha as the title
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

Select Type, Add-on, Sweetness of Orange Matcha
    ${type_cold}=    Get WebElement    css:#description-page > div > div > div:nth-child(2) > button
    ${sweetness_75}=    Get WebElement    css:#description-page > div > div > div:nth-child(4) > button.description_option__pWJJk.description_selected__k62fm
    ${addCart_button}=    Get WebElement    css:#description-page > div > div > button

    Click Element    ${type_cold}   # select type: cold
    ${clicked_type_cold}=    Get WebElement    css:#description-page > div > div > div:nth-child(2) > button.description_option__pWJJk.description_selected__k62fm
    Wait Until Page Contains Element    ${clicked_type_cold}
    Element Should Be Visible    ${clicked_type_cold}

    Click Element    ${sweetness_75}    # select sweetness: 75
    ${clicked_sweetness_75}=    Get WebElement    css:#description-page > div > div > div:nth-child(4) > button.description_option__pWJJk.description_selected__k62fm
    Wait Until Page Contains Element    ${clicked_sweetness_75}
    Element Should Be Visible    ${clicked_sweetness_75}

Add Orange Matcha To Cart
    ${addCart_button}=    Get WebElement    css:#description-page > div > div > button
    Click Element    ${addCart_button}
    ${successful_container}=    Get WebElement    css:body > main > div.description_modal-overlay__pwguD > div
    Wait Until Element Is Visible    ${successful_container}
    ${successful_text}=    Get Text    css:body > main > div.description_modal-overlay__pwguD > div > p
    Should Contain    ${successful_text}    Item added to cart successfully!

Navigate Back To Homepage After Add Orange Matcha
    ${close_button}=    Get WebElement    css:body > main > div.description_modal-overlay__pwguD > div > button
    Click Element    ${close_button}
    Wait Until Page Contains Element    ${homepage}
    Element Should Be Visible    ${homepage}

Search Donut
    Input Text    ${search_bar}    ${search_keyword_2}
    Wait Until Element Is Visible    ${search_result_container}
    ${menus} =    Get WebElements    ${search_result_container} >> ${menus}
    FOR    ${item}    IN    @{menus}
        ${menu_title}=    Get Text    ${item}
        Should Contain    ${menu_title.lower()}    ${search_keyword_2.lower()}
    END

Select Donut
# After click to select item, it should show the selected name
    ${menus}=    Get WebElements    ${search_result_container} >> ${menus}
    FOR    ${item}    IN    @{menus}
        ${menu_title}=    Get Text    ${item}
        ${is_match}=    Evaluate    '${search_keyword_2.lower()}' in '${menu_title.lower()}'
        Run Keyword If    ${is_match}    Add Item To Cart    ${item}
        Exit For Loop If    ${is_match}
    END

    Wait Until Page Contains Element    ${describtion_container}
    ${menu_title}=    Get Text    css:#description-page > div > h1
    Should Contain    ${menu_title.lower()}    ${search_keyword_2.lower()}

Add Donut To Cart
    ${addCart_button}=    Get WebElement    css:#description-page > div > div > button
    Click Element    ${addCart_button}
    ${successful_container}=    Get WebElement    css:body > main > div.description_modal-overlay__pwguD > div
    Wait Until Element Is Visible    ${successful_container}
    ${successful_text}=    Get Text    css:body > main > div.description_modal-overlay__pwguD > div > p
    Should Contain    ${successful_text}    Item added to cart successfully!

Navigate Back To Homepage After Add Donut
    ${close_button}=    Get WebElement    css:body > main > div.description_modal-overlay__pwguD > div > button
    Click Element    ${close_button}
    Wait Until Page Contains Element    ${homepage}
    Element Should Be Visible    ${homepage}

*** Keywords ***
Add Item To Cart
    [Arguments]    ${item}
    ${add_button}=    Get WebElement    css:#Card > a > div.Card_cardAddToCart__ji65r
    Click Element    ${add_button}