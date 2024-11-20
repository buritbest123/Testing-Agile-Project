*** Settings ***
Library    SeleniumLibrary
Suite Teardown    Close Browser

*** Variables ***
${browser}       Chrome
# ${bash_url}      http://localhost:3000/
${bash_url}      http://10.34.112.130:3000/

${search_bar}    css:#searchInput
${search_result_container}    css:body > main > div.homepage_cardContainer__wrHEN
${menus}    css:#CardTitle
${not_found_container}    css:#Notfound

# define search keywords for test
${search_keyword_matcha}    Matcha

*** Test Cases ***
Test opening browser
    Open Browser    ${bash_url}    ${browser}

# Test search function
Test search function for with a keyword 'Matcha'
# If found Matcha, iterate all cards to get menu titles, check whether each card title contain a word Matcha or not.
    Input Text    ${search_bar}    ${search_keyword_matcha}
    Wait Until Element Is Visible    ${search_result_container}
    ${menus} =    Get WebElements    ${search_result_container} >> ${menus}
    FOR    ${item}    IN    @{menus}    
        ${title}=    Get Text    ${item}
        Should Contain    ${title.lower()}    ${search_keyword_matcha.lower()}
    END
    