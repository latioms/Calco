import { Component } from '@angular/core';
// import { isNumberObject} from 'util';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  display = '0';
  firstval: number = null;
  operator: any = null;
  newcursor = false;
  isc = false;
  iscomma = false;

  numberGroups = [
    [1, 2, 3, '+'],
    [4, 5, 6, '-'],
    [7, 8, 9, '*'],
    [0, '.', 'C', '/']
  ]
  equalButton = '=';

  onButtonPress(val:any) {

    console.log(val);
    console.log(this.operator);
    console.log(this.display);
 

    switch (val) {
      case 'C':
        this.display = '0';
        this.iscomma = false;
        this.firstval = null;
        this.operator = null;
        this.newcursor = false;
        break;
      // case 'C':
      //   this.display = '0';
      //   this.isc = false;
      //   break;
      case '/':
        this.addoperator('/');
        break;
      case '*':
        this.addoperator('*');
        break;
      case '-':
        this.addoperator('-');
        break;
      case '+':
        this.addoperator('+');
        break;
      case '=':
        if (this.firstval !== null && this.operator !== null) {
          this.calclast();
        }
        this.operator = null;
        break;
      case 0:
        this.addnumber('0');
        break;
      case 1:
        this.addnumber('1');
        break;
      case 2:
        this.addnumber('2');
        break;
      case 3:
        this.addnumber('3');
        break;
      case 4:
        this.addnumber('4');
        break;
      case 5:
        this.addnumber('5');
        break;
      case 6:
        this.addnumber('6');
        break;
      case 7:
        this.addnumber('7');
        break;
      case 8:
        this.addnumber('8');
        break;
      case 9:
        this.addnumber('9');
        break;
      case '.':
        this.addcomma();
        break;
    }
  }

  // ----------------------Fonctions----------------------------

  addcomma() {
    if (this.iscomma === false ) {
      this.iscomma = true;
    } else {
      this.iscomma = false;
    }

  }
  addnumber(nbr: string) {
    if (nbr === '0' ) {
      if (this.newcursor === true) {
        this.display = nbr;
        this.newcursor = false;
      } 
      else if (this.display !== '0') 
      {
        if (this.iscomma === true && !this.display.includes('.')) {
          this.display = `${this.display.toString()}.${nbr}`;
        } else {
          this.display = this.display.toString() + nbr;
        }

      } else if (this.display === '0' && !this.display.includes('.')) {
        if (this.iscomma === true) {
          this.display = `${this.display.toString()}.${nbr}`;
        }
      }
    } 
    else {
      if (this.newcursor === true) {
        this.display = nbr;
        this.newcursor = false;
      } else if (this.display === '0') {
        if (this.iscomma === true) {
          if (this.display.toString().indexOf('.') > -1) {
            this.display = this.display.toString() + nbr;
          } else {
            this.display = `${this.display.toString()}.${nbr}`;
          }
        } else {
          this.display = nbr;
        }
      } else {
        if (this.iscomma === true) {
          if (this.display.toString().indexOf('.') > -1) {
            this.display = this.display.toString() + nbr;
          } else {
            this.display = `${this.display.toString()}.${nbr}`;
          }
        } else {
          this.display = this.display.toString() + nbr;
        }
      }
    }
    this.isc = true;
  }

    
  addoperator(op: string) {
    if (this.newcursor === false) {
      if (this.firstval === null) {
        if (this.iscomma === true) {
          this.firstval = parseFloat(this.display);
        } else {
          this.firstval = parseInt(this.display, 0);
        }
      }
      if (this.firstval !== null && this.operator !== null) {
        this.calclast();
      }
    }
    this.iscomma = false;
    this.operator = op;
    this.newcursor = true;
  }

  calclast() {
    switch (this.operator) {
      case '/':
        if (this.iscomma === true) {
          if(parseFloat(this.display) != 0)
           this.firstval = (this.firstval / parseFloat(this.display));
          else{
            Error("")
          }
        } else {
          this.firstval = (this.firstval / parseInt(this.display, 0));
        }
        break;
      case '*':
        if (this.iscomma === true) {
          this.firstval = (this.firstval * parseFloat(this.display));
        } else {
          this.firstval = (this.firstval * parseInt(this.display, 0));
        }
        break;
      case '-':
        if (this.iscomma === true) {
          this.firstval = (this.firstval - parseFloat(this.display));
        } else {
          this.firstval = (this.firstval - parseInt(this.display, 0));
        }
        break;
      case '+':
        if (this.iscomma === true) {
          this.firstval = (this.firstval + parseFloat(this.display));
        } else {
          this.firstval = (this.firstval + parseInt(this.display, 0));
        }
        break;
    }

    this.display = this.firstval.toString();
  }
  
  //______________Display_______________________
   toggle = document.querySelector('#themeToggle');
   
  
  toggleTheme(event){
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark')
    }else{
      document.body.setAttribute('color-theme','light')
    }
  }
    
  constructor() {}

}
