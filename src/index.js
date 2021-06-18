import 'regenerator-runtime/runtime';
import 'core-js/stable';
import axios from 'axios';

class getGithubStatus{
    
    async getData(){
        const githubPage = await axios('https://www.githubstatus.com');
        const githubData = await githubPage.data;
        return githubData;
    };
    
    async getStatus(){
        const page = await this.getData();
        document.body.innerHTML = page;
        const status = document.querySelectorAll('.component-inner-container');
        document.body.innerHTML = "";
        return status;
    };

    async formatter(){
        const status = await this.getStatus();
        this.createContainer();
        status.forEach((data, index) => {
            if (index !== 3) {
                let status = data.getAttribute('data-component-status');
                status = this.defineStatus(status);
                const statusName = data.firstElementChild.textContent
                const className = statusName.trim().split(' ').join('-');
                this.createDiv(className, statusName, status);
            };
        });
    };

    createDiv(className, value, status){
        const container = document.querySelector('.container');
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'row');
        newDiv.classList.add(className);
        container.appendChild(newDiv);
        this.createElement('h2', value, newDiv);
        this.createIcon(newDiv, status);
    };

    createElement(element, value, container){
        const newElement = document.createElement(`${element}`);
        newElement.textContent = value;
        container.appendChild(newElement);
    }

    createIcon(container, status){
        const icon = this.defineIcon(status);
        const newIcon = document.createElement('i');
        newIcon.setAttribute('class', `bi ${icon}`);
        const description = this.defineDescription(status);
        newIcon.setAttribute('aria-label', `${description}`);
        newIcon.setAttribute('role', `img`);
        container.appendChild(newIcon);
    }

    defineStatus(status){
        switch (status) {
            case 'operational':
                return 1;
            
            case 'partial_outage':
                return 0;

            default:
                return -1;
        };
    }

    defineIcon(status) {
        switch(status){
            case 1:
                return 'bi-check-circle-fill';

            case 0:
                return 'bi-exclamation-circle';

            case -1:
                return 'bi-exclamation-circle-fill'
        }
    }

    defineDescription(status) {
        switch(status){
            case 1:
                return 'operational';

            case 0:
                return 'partial outage';

            case -1:
                return 'not working'
        }
    }
    
    createContainer(){
        const container = document.createElement('main');
        container.setAttribute('class', 'container');
        document.body.appendChild(container);
    }

    style(){
        const status = document.querySelectorAll('.component-container');
        status.forEach((div) => {
            div.classList.add('row');
            div.classList.add('justify-content-center');
        });
    }

}

const page = new getGithubStatus();
page.formatter();
