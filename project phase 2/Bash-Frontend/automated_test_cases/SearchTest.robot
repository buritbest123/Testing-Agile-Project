*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        http://localhost:3000/
${MENU_ITEM_VALID}  Espresso
${MENU_ITEM_INVALID}  zzz
${MENU_ITEMS}     matcha
${EXPECTED_COUNT_ONE}  1
${EXPECTED_COUNT_ZERO}  0
${EXPECTED_COUNT_FIVE}  5

*** Keywords ***
Open Browser To Website
    [Documentation]  Opens the website URL in Chrome and maximizes the window.
    Open Browser    ${URL}    Chrome
    Maximize Browser Window

Enter Menu Item Name
    [Arguments]    ${menu_item}
    [Documentation]  Enters the specified search term in the search input field.
    Input Text    id=searchInput   ${menu_item}
    Sleep    2s

Verify Matching Count
    [Arguments]    ${expected_count}
    [Documentation]  Checks that the displayed matching count equals the provided expected value.
    Wait Until Element Is Visible    id=matchedNumber    timeout=5s
    ${count}=    Get Text    id=matchedNumber
    Should Be Equal As Numbers    ${count}    ${expected_count}

Verify Card Title
    [Documentation]  Waits until the card is visible and verifies the title text is "Espresso".
    Wait Until Element Is Visible    id=Card    timeout=5s
    Element Text Should Be    id=CardTitle    Espresso

Verify No Results Message
    [Documentation]  Confirms the "No Result" image is displayed when no items match.
    Wait Until Element Is Visible    id=Notfound    timeout=5s
    Element Text Should Be    id=Notfound    No Result  # Verify the text header


*** Test Cases ***

Test Valid Menu Item Search
    [Documentation]  Verify that the website accepts a valid menu item name and displays the correct matching count.
    Open Browser To Website
    Maximize Browser Window
    Enter Menu Item Name       ${MENU_ITEM_VALID}
    Verify Matching Count    ${EXPECTED_COUNT_ONE}
    Verify Card Title
    Close Browser

 Test No Results Search
    [Documentation]  Verify that the website displays a "No Result" image when no items match the search term.
    Open Browser To Website
    Maximize Browser Window
    Enter Menu Item Name    ${MENU_ITEM_INVALID}
    Verify Matching Count    ${EXPECTED_COUNT_ZERO}
    Verify No Results Message
    Close Browser

Test Multiple Matched Search
    [Documentation]  Verify that the website works for multiple matched items.
    Open Browser To Website
    Maximize Browser Window
    Enter Menu Item Name    ${MENU_ITEMS}
    Verify Matching Count    ${EXPECTED_COUNT_FIVE}
    Close Browser