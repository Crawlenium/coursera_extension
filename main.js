document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

    function mainFunc(){
        function getInfomaionInEachCertificate(element){
            element.getElementsByClassName('add-to-linkedin-section')[0].children[0].click()
            const details = element.children[1].children[2]
            
            try {
                let name = details.getElementsByClassName('linkedin-detail-value')[0].children[0].textContent
            } catch {
                let name = details.getElementsByClassName('linkedin-detail-value')[0].textContent
            }

            let issuingOrganization = details.getElementsByClassName('linkedin-detail-value')[1].textContent
            let issueDate = details.getElementsByClassName('linkedin-detail-value')[2].textContent
            let expirationDate = details.getElementsByClassName('linkedin-detail-value')[3].textContent
            let credentialID = details.getElementsByClassName('linkedin-detail-value')[4].textContent
            let credentialURL = details.getElementsByClassName('linkedin-detail-value')[5].textContent

            return [name, issuingOrganization, issueDate, expirationDate, credentialID, credentialURL].join(";")
        }

        let allCertificateSection = document.getElementsByClassName("rc-AccomplishmentCard card-rich-interaction");
        let info = [];
        for (ele of allCertificateSection){
            info.push(getInfomaionInEachCertificate(ele));
        }

        const link = document.createElement("a");
        const file = new Blob([info.join("\n")], { type: 'text/plain' });
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
