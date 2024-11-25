*** Settings ***
Library    SeleniumLibrary
Suite Teardown    Close Browser

*** Variables ***
${browser}       Chrome
${bash_url}      http://localhost:3000/
# ${bash_url}      http://10.34.112.130:3000/

${search_bar}    css:#searchInput
${search_result_container}    css:body > main > div.homepage_cardContainer__wrHEN
${menus}    css:#CardTitle
${not_found_container}    css:#Notfound

# define search keywords for test
${search_keyword_thai}    กาแฟ

*** Test Cases ***
Test opening browser
    Open Browser    ${bash_url}    ${browser}

# Test search function
Test search function with a keyword 'กาแฟ'
# No กาแฟ, it should show container for no result scenario with text 'No Result' inside
    Input Text    ${search_bar}    ${search_keyword_thai}
    Wait Until Element Is Visible    ${not_found_container}
    ${not_found_text}=    Get Text    css:#Notfound > p
    Should Contain    ${not_found_text}    No Result
    