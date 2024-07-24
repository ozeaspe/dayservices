import { LightningElement, track } from 'lwc';

export default class Workschedule extends LightningElement {

    // Valor selecionado atualmente
    @track inputValue = '';
    @track value = '';
    @track calendar;
    @track selectedCheckbox = { name: '', checked: false };
    @track selectedCheckbox2 = { name: '', checked: false };

    //meses para a picklist
    get monthOptions () { 
        return [
            { label: 'January', value: '0'},
            { label: 'February', value: '1'},
            { label: 'March', value: '2'},
            { label: 'April', value: '3'},
            { label: 'May', value: '4'},
            { label: 'June', value: '5'},
            { label: 'July', value: '6'},
            { label: 'August', value: '7'},
            { label: 'September', value: '8'},
            { label: 'October', value: '9'},
            { label: 'November', value: '10'},
            { label: 'December', value: '11'}
        ]
    }

    //Método chamado quando o valor da picklist muda
    handleMonthChange(event) {
        this.value = event.detail.value;
        this.generateCalendar(parseInt(this.value));
    }

    generateCalendar(month) {
        const year = new Date().getFullYear();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let day = 1;
        let calendar = [];
        
        for (let i = 0; i < 6; i++) {
            let week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    week.push('');
                } else if (day > daysInMonth) {
                    week.push('');
                } else {
                    week.push(day);
                    day++;
                }
            }
            calendar.push(week);
        }
        
        this.calendar = calendar;
    }

    handleDayClick(event) {
        const dayIndex = event.currentTarget.dataset.id;
        const dayValue = event.currentTarget.innerText;
        console.log(`Dia clicado: ${dayValue}, Índice: ${dayIndex}`);
    }

    
    handleCheckboxChange(event) {
        this.selectedCheckbox = {
            name: event.target.name,
            checked: event.target.checked,
            label: event.target.label
        };
    }

    handleCheckboxChange2(event) {
        this.selectedCheckbox2 = {
            name: event.target.name,
            checked: event.target.checked,
            label: event.target.label
        };
    }

    handleInputChange(event){
        this.inputValue  = event.target.value
    }

    handleGenerateShedule() {

        console.log(this.inputValue);

        const message = this.selectedCheckbox.checked
            ? `Selected Day ${this.selectedCheckbox.label} ` 
            : ``;
        
        const message2 = this.selectedCheckbox2.checked
            ? ` Shift ${this.selectedCheckbox2.label}` 
            : ``;
            
        alert(message + 'and' + message2);
        
    }

    

}
    
