*** Settings ***
Library    SeleniumLibrary
Library    String

*** Variables ***
${URL}                       http://10.34.112.130:3000/
${BROWSER}                   Chrome
${MAIN_MANU}                 xpath=//div[contains(@main, 'pt-20')]
${FILTER_BUTTON_COFFEE}      css=.FilterBar_filterButton__njB42:nth-child(2)
${FILTER_BUTTON_MATCHA}      css=.FilterBar_filterButton__njB42:nth-child(3)
${FILTER_BUTTON_BAKERY}      css=.FilterBar_filterButton__njB42:nth-child(5)
${SECOND_BUTTON}             css=.tap-highlight-transparent:nth-child(4)
${CONTAINER_LOCATOR}         xpath=//div[contains(@class, 'homepage_cardContainer__wrHEN')]
${MAIN_LOCATOR}              xpath=//div[contains(@class, 'homepage_cardContainer__wrHEN')]//main



*** Test Cases ***
Coffee Test
    #Expected Result for Coffee
    ${COFFEE_EXPECTED_TITLES}    Create List    Dirty 👍    Americano    Espresso    Latte    Cappuccino    Es-Yen (Thai Style)    Mocha    Honey Americano 👍    Black Yuzu 👍    Orange Coffee 👍
    Open Browser    ${URL}    ${BROWSER}
    Set Window Size    945    1012
    #Wait for server to fetch
    Sleep    1s
    Log    Start test
    #Check Main Menu
    Should Not Be Empty    ${MAIN_MANU}
    #Navigate to Coffee Filter
    Click Element    ${FILTER_BUTTON_COFFEE}
    Wait Until Page Contains Element    ${CONTAINER_LOCATOR}
    #Get element of Menu
    ${main_elements}=    Get WebElements    xpath=//div[contains(@class, 'homepage_cardContainer__wrHEN')]//main//*[@id="CardTitle"]

    # Ensure there are 10 Menus
    ${count}=    Get Length    ${main_elements}
    Log    Total number of titles: ${count}
    Should Be Equal As Numbers    ${count}    10
    
    # Verify each Menu
    FOR    ${i}    IN RANGE    ${count}
        ${title_text}=    Get Text    ${main_elements}[${i}]

        Log    Checking title_text: ${title_text}
        Should Be Equal As Strings    ${title_text}    ${COFFEE_EXPECTED_TITLES}[${i}]
    END
    # Go for second page of Menu
    ${COFFEE_EXPECTED_TITLES}    Create List    Coconut Flower Macchiato 👍
    Click Element    ${SECOND_BUTTON} 
    Wait Until Page Contains Element    ${CONTAINER_LOCATOR}
    ${main_elements}=    Get WebElements    xpath=//div[contains(@class, 'homepage_cardContainer__wrHEN')]//main//*[@id="CardTitle"]

    # Ensure there are 1 Menu
    ${count}=    Get Length    ${main_elements}
    Log    Total number of titles: ${count}
    Should Be Equal As Numbers    ${count}    1

    ${title_text}=    Get Text    ${main_elements}[${0}]
    # Verify each title
    Log    Checking title_text: ${title_text}
    Should Be Equal As Strings    ${title_text}    ${COFFEE_EXPECTED_TITLES}[${0}]

    Close Browser
    Log    Test completed successfully

