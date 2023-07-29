document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        function getInfomaionInEachCertificate(element){
            element.getElementsByClassName('add-to-linkedin-section')[0].children[0].click()
            const details = document.getElementsByClassName("rc-AccomplishmentCard card-rich-interaction")[0].children[1].children[2]

            const name = details.getElementsByClassName('linkedin-detail-value')[0].children[0].textContent
            const issuingOrganization = details.getElementsByClassName('linkedin-detail-value')[1].textContent
            const issueDate = details.getElementsByClassName('linkedin-detail-value')[2].textContent
            const expirationDate = details.getElementsByClassName('linkedin-detail-value')[3].textContent
            const credentialID = details.getElementsByClassName('linkedin-detail-value')[4].textContent
            const credentialURL = details.getElementsByClassName('linkedin-detail-value')[5].textContent

            console.log([name, issuingOrganization, issueDate, expirationDate, credentialID, credentialURL].join(";"))
            // return [name, issuingOrganization, issueDate, expirationDate, credentialID, credentialURL].join(";")
        }

        const all_certificate_section = document.getElementsByClassName("rc-AccomplishmentCard card-rich-interaction");
        
        for (element of all_certificate_section){
            getInfomaionInEachCertificate(element)
        }
        

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: mainFunc,
            //        files: ['contentScript.js'],  // To call external file instead
        }).then(() => console.log('Injected a function!'));
    });
});