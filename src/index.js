import 'regenerator-runtime/runtime';
import 'core-js/stable';
import axios from 'axios';

class getGithubStatus{
    
    async getData(){
        const githubPage = await axios('https://www.githubstatus.com');
        const githubData = await githubPage.data;
        console.log(githubData);
        return githubData;
    };
    
    async getStatus(){
        const page = await this.getData();
        document.body.innerHTML = page;
        const status = document.querySelectorAll('.component-container');
        document.body.innerHTML = "";
        status.forEach((data, index) => index !== 3 && document.body.appendChild(data));
    };

}

const page = new getGithubStatus();
page.getStatus();
