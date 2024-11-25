*** Settings ***
Library    SeleniumLibrary
Library    String

*** Variables ***
# ${URL}                       http://10.34.112.130:3000/
${URL}                       http://localhost:3000/
${BROWSER}                   Chrome
${MAIN_MANU}                 xpath=//div[contains(@main, 'pt-20')]
${FILTER_BUTTON_COFFEE}      css=.FilterBar_filterButton__njB42:nth-child(2)
${FILTER_BUTTON_MATCHA}      css=.FilterBar_filterButton__njB42:nth-child(3)
${FILTER_BUTTON_BAKERY}      css=.FilterBar_filterButton__njB42:nth-child(5)
${SECOND_BUTTON}             css=.tap-highlight-transparent:nth-child(4)
${CONTAINER_LOCATOR}         xpath=//div[contains(@class, 'homepage_cardContainer__wrHEN')]
${MAIN_LOCATOR}              xpath=//div[contains(@class, 'homepage_cardContainer__wrHEN')]//main

*** Test Cases ***

Bakery Test
    #Expected Result for BAKERY
    ${BAKERY_EXPECTED_TITLES}    Create List    Plain Croissant    Chocolate Croissant 👍    Nutella Croissant 👍    Cream Cheese Danish 👍    Danish Custard   Ham Cheese Croissant    Croffle    Madeleine    Original Cookies    Lava Chocolate Cookies 👍
    Open Browser    ${URL}    ${BROWSER}
    Set Window Size    945    1012
    #Wait for server to fetch
    Sleep    1s
    Log    Start test
    #Check Main Menu
    Should Not Be Empty    ${MAIN_MANU} 
    #Navigate to Bakery Filter
    Click Element    ${FILTER_BUTTON_BAKERY}
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
        Should Be Equal As Strings    ${title_text}    ${BAKERY_EXPECTED_TITLES}[${i}]
    END
    # Go for second page of Menu
    ${BAKERY_EXPECTED_TITLES}    Create List    Brownies 👍    Donut    Kanom Khai
    Click Element    ${SECOND_BUTTON} 
    Wait Until Page Contains Element    ${CONTAINER_LOCATOR}
    ${main_elements}=    Get WebElements    xpath=//div[contains(@class, 'homepage_cardContainer__wrHEN')]//main//*[@id="CardTitle"]

    # Ensure there are 3 Menus
    ${count}=    Get Length    ${main_elements}
    Log    Total number of titles: ${count}
    Should Be Equal As Numbers    ${count}    3

    # Verify each Menu
    FOR    ${i}    IN RANGE    ${count}
        ${title_text}=    Get Text    ${main_elements}[${i}]
    
        Log    Checking title_text: ${title_text}
        Should Be Equal As Strings    ${title_text}    ${BAKERY_EXPECTED_TITLES}[${i}]
    END

    Close Browser
    Log    Test completed successfully