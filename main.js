document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

    function mainFunc(){
        function getInfomaionInEachCertificate(element){
            element.getElementsByClassName('add-to-linkedin-section')[0].children[0].click()
            const details = document.getElementsByClassName("rc-AccomplishmentCard card-rich-interaction")[0].children[1].children[2]

            const name = details.getElementsByClassName('linkedin-detail-value')[0].children[0].textContent
            const issuingOrganization = details.getElementsByClassName('linkedin-detail-value')[1].textContent
            const issueDate = details.getElementsByClassName('linkedin-detail-value')[2].textContent
            const expirationDate = details.getElementsByClassName('linkedin-detail-value')[3].textContent
            const credentialID = details.getElementsByClassName('linkedin-detail-value')[4].textContent
            const credentialURL = details.getElementsByClassName('linkedin-detail-value')[5].textContent

            return [name, issuingOrganization, issueDate, expirationDate, credentialID, credentialURL].join(";")
        }

        const all_certificate_section = document.getElementsByClassName("rc-AccomplishmentCard card-rich-interaction");
        const info = [];
        for (element of all_certificate_section){
            info.push(getInfomaionInEachCertificate(element));
        }

        const link = document.createElement("a");
        const file = new Blob([info], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "accomplishment.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    };

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: mainFunc,
        }).then(() => console.log('Injected a function!'));
    });
});