*** Settings ***
Library    SeleniumLibrary
Suite Teardown    Close Browser

*** Variables ***
${browser}       Chrome
${bash_url}      http://localhost:3000/
# ${bash_url}      http://10.34.112.130:3000/

${homepage}    css:body > main
${search_bar}    css:#searchInput
${search_result_container}    css:body > main > div.homepage_cardContainer__wrHEN
${menus}    css:#CardTitle

${search_keyword}    Caramel Fresh Milk

${describtion_container}    css:#description-page

*** Test Cases ***
Test opening browser
    Open Browser    ${bash_url}    ${browser}

Search Caramel Fresh Milk
# When searching Caramel Fresh Milk, check the search result if the menu result contain the key word Caramel Fresh Milk or not
    Input Text    ${search_bar}    ${search_keyword}
    Wait Until Element Is Visible    ${search_result_container}
    ${menus} =    Get WebElements    ${search_result_container} >> ${menus}
    FOR    ${item}    IN    @{menus}
        ${menu_title}=    Get Text    ${item}
        Should Contain    ${menu_title.lower()}    ${search_keyword.lower()}
        Run Keyword If    '${menu_title.lower()}' == '${search_keyword.lower()}'    Click Element    css:#Card > a > div.Card_cardAddToCart__ji65r
    END

Select Caramel Fresh Milk
    # After click to select Caramel Fresh Milk, it should show Caramel Fresh Milk as the title
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

Select Type, Add-on, Sweetness of Caramel Fresh Milk
    ${type_cold}=    Get WebElement    css:#description-page > div > div > div:nth-child(2) > button.description_option__pWJJk.description_selected__k62fm
    ${sweetness_50}=    Get WebElement    css:#description-page > div > div > div:nth-child(6) > button.description_option__pWJJk.description_selected__k62fm
    ${add_on_oat_milk}=    Get WebElement    css:#Options > button:nth-child(1)
    ${addCart_button}=    Get WebElement    css:#description-page > div > div > button

    Click Element   ${add_on_oat_milk}    #select Add-on: Oat Milk
    ${add_on_oat_milk_clicked}=    Get WebElement    css:#Options > button.description_option__pWJJk.description_selected__k62fm
    Element Should Be Visible    ${add_on_oat_milk_clicked}

    Click Element    ${type_cold}   # select type: cold
    ${clicked_type_cold}=    Get WebElement    css:#description-page > div > div > div:nth-child(2) > button.description_option__pWJJk.description_selected__k62fm
    Wait Until Page Contains Element    ${clicked_type_cold}
    Element Should Be Visible    ${clicked_type_cold}

    Click Element    ${sweetness_50}    # select sweetness: 50
    ${clicked_sweetness_50}=    Get WebElement    css:#description-page > div > div > div:nth-child(6) > button.description_option__pWJJk.description_selected__k62fm
    Wait Until Page Contains Element    ${clicked_sweetness_50}
    Element Should Be Visible    ${clicked_sweetness_50}

Add Caramel Fresh Milk To Cart
    ${addCart_button}=    Get WebElement    css:#description-page > div > div > button
    Click Element    ${addCart_button}
    ${successful_container}=    Get WebElement    css:body > main > div.description_modal-overlay__pwguD > div
    Wait Until Element Is Visible    ${successful_container}
    ${successful_text}=    Get Text    css:body > main > div.description_modal-overlay__pwguD > div > p
    Should Contain    ${successful_text}    Item added to cart successfully!

Navigate Back To Homepage After Add Caramel Fresh Milk
    ${close_button}=    Get WebElement    css:body > main > div.description_modal-overlay__pwguD > div > button
    Click Element    ${close_button}
    Wait Until Page Contains Element    ${homepage}
    Element Should Be Visible    ${homepage}

Caramel Fresh Milk Added In Cart
    ${cart_button}=    Get WebElement    css:body > main > main > header > ul > li:nth-child(1)
    Click Element    ${cart_button}

    Wait Until Page Contains Element    css:body > main > div.cartPage_miscContainer__RltQF

    ${item_title}=    Get Text    css:body > main > div.cartPage_itemContainer__Tuk8W > div > div.CartItem_itemInfo__Z5gbv > h3
    ${item_detail}=    Get Text    css:body > main > div.cartPage_itemContainer__Tuk8W > div > div.CartItem_itemInfo__Z5gbv > p
    Should Contain    ${item_title}    Caramel Fresh Milk
    Should Contain    ${item_detail}    Hot, 50%, Oat Milk
    

*** Keywords ***
Add Item To Cart
    [Arguments]    ${item}
    ${add_button}=    Get WebElement    css:#Card > a > div.Card_cardAddToCart__ji65r
    Click Element    ${add_button}

