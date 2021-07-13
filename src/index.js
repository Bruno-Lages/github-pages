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
        this.createTitle();
        this.createContainer();
        this.createFooter();
        status.forEach((data, index) => {
            if (index !== 3) {
                let statusText = data.getAttribute('data-component-status');
                let status = this.defineStatus(statusText);
                const statusName = data.firstElementChild.textContent
                const className = statusName.trim().split(' ').join('-');
                this.createDiv(className, statusName, status, statusText);
            };
        });
    };

    createDiv(className, value, status, statusText){
        const container = document.querySelector('.container ');
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'row');
        newDiv.classList.add(className);
        container.appendChild(newDiv);
        this.createElement('h2', value, newDiv);
        this.createIcon(newDiv, status, statusText);
    };

    createElement(element, value, container){
        const newElement = document.createElement(`${element}`);
        newElement.textContent = value;
        newElement.setAttribute('class', 'col-10');
        container.appendChild(newElement);
    }

    createIcon(container, status, statusDescription){
        const icon = this.defineIcon(status);
        const newIcon = document.createElement('i');
        newIcon.setAttribute('class', `bi ${icon} col-1`);
        newIcon.setAttribute('aria-label', `${statusDescription.replace('-', ' ')}`);
        newIcon.setAttribute('role', `img`);
        newIcon.style.color = status > 0 ? '#29b029' : 'red'; 
        container.appendChild(newIcon);
    }

    defineStatus(status){
        switch (status) {
            case 'operational':
                return 1;

            default:
                return -1;
        };
    }

    defineIcon(status) {
        switch(status){
            case 1:
                return 'bi-check-circle-fill';

            case -1:
                return 'bi-exclamation-circle-fill'
        }
    }

    
    createContainer(){
        const container = document.createElement('main');
        container.setAttribute('class', 'container');
        document.body.appendChild(container);
    }
    
    createTitle(){
        const title = document.createElement('h1');
        title.textContent = 'Github Status';
        document.body.appendChild(title);
    }

    createFooter(){
        const footer = document.createElement('footer');
        footer.innerHTML = '<a href="https://github.com/Bruno-Lages/github-pages"><i class="bi bi-github" role="img" aria-label="GitHub link" style="color: #c1dcec" ></i></a>';
        document.body.appendChild(footer);
    }

}

const page = new getGithubStatus();
page.formatter();
