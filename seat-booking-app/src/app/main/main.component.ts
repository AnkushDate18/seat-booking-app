import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {


	totalSeats = 0
	numberOfRows = 80
	numberOfTickets = 0
	theatre: any
	colorClass = '#f0f'
	id = 0
	mySeats: any
	showMessage = false
	allTickets = 0
	endTheShow = false
	constructor() {
		// console.log(this.drawAMatrixOfNumbers())
		this.theatre = this.drawAMatrixOfNumbers();
		// console.log(this.totalSeats)
		console.log("my tickets: ", this.mySeats)
	}

	getValue(v: number) {
		if (v > 80) {
			alert("This seat cant be selected")
		} else {
			// alert(v)
			let id = '#' + v.toString()
			const b = <HTMLElement>document.querySelector(id);
			// b.style.backgroundColour = 'purple'
			console.log(b, "value returned: ", id)
			if (this.id == 81 || this.id == 82 || this.id == 83 || this.id == 84) {
				this.colorClass = 'grey'

			}
		}
	}
	ngOnInit(): void {
		// console.log(this.totalSeats)
	}

	drawAMatrixOfNumbers() {
		let rows = []
		let totalRows = 12
		let seatsInARow = 7
		let lastElement = 0
		let minLength = 3
		// for (let i = 0; i < number ; i++){
		for (let j = 1; j <= totalRows; j++) {
			let row = []
			if (rows.length == 0) {
				for (let seatNo = 1; seatNo <= seatsInARow; seatNo++) {
					let obj = {
						seatNo: seatNo,
						isBooked: false
					}
					row.push(obj)
					++lastElement
				}
			} else if (j == 12) {
				for (let seatNo = lastElement + 1; seatNo <= (lastElement + minLength); seatNo++) {
					let obj = {
						seatNo: seatNo,
						isBooked: false	
					}
					row.push(obj)
					if (seatNo == (lastElement + minLength)) {
						// console.log("hey")
						lastElement = seatNo
						break
					}
				}
			} else {
				for (let seatNo = lastElement + 1; seatNo <= (lastElement + seatsInARow); seatNo++) {
					let obj = {
						seatNo: seatNo,
						isBooked: false
					}
					row.push(obj)
					if (seatNo == (lastElement + seatsInARow)) {
						// console.log("hey")
						lastElement = seatNo
						break
					}
				}

			}

			rows.push(row)
		}
		// }
		return rows;
	}

	BookNow() {
		this.endTheShow = false;
		// let numberOfTickets = parseInt(this.numberOfTickets)
		// alert(this.numberOfTickets)
		//
		// console.log("entered number: ", this.numberOfTickets)
		if (this.numberOfTickets <= 0 || this.numberOfTickets > 6) {
			alert("You can Book seats between 1 and 6 at a time")
		} else if (this.totalSeats >= 80) {
			alert("Regret!")
		} else {
			let isOccupied: boolean = false
			for (let i = 0; i < this.theatre.length; i++) {
				let emptySeatCnt = this.theatre[i].filter((t: { isBooked: any; }) => !t.isBooked).length
				// console.log(emptySeatCnt)
				if (emptySeatCnt >= this.numberOfTickets) {
					let t = 0
					let mySeats = []
					for (let j = 0; j < this.theatre[i].length && t < this.numberOfTickets; j++) {
						if (!this.theatre[i][j].isBooked) {
							this.theatre[i][j].isBooked = true;
							// this.mySeats.push(this.theatre[i][j].seatNo)
							mySeats.push(this.theatre[i][j].seatNo)
							t++;
							this.totalSeats++
							// console.log(this.totalSeats)
							isOccupied = true
						}
					}
					this.numberOfTickets = 0
					this.showMessage = true
					this.mySeats = mySeats
					this.allTickets = this.mySeats.length
					console.log(this.mySeats)
					break;
				}
			}
			if (!isOccupied) {
				let t1 = 0
				let mySeats = []
				// console.log(typeof	(this.totalSeats),typeof(this.numberOfTickets))
				let a : number
				a = parseInt(this.numberOfTickets.toString())
				if((this.totalSeats)+a>80){
					console.log(this.totalSeats+typeof(this.numberOfTickets))
					alert(this.numberOfTickets+" tickets are not available!")
				}else{
					for (let i = 0; i < this.theatre.length; i++) {

						for (let j = 0; j < this.theatre[i].length && t1 < this.numberOfTickets; j++) {
							if (!this.theatre[i][j].isBooked) {
								this.theatre[i][j].isBooked = true;
								mySeats.push(this.theatre[i][j].seatNo)
								t1++;
								this.totalSeats++
								// console.log(this.totalSeats)
							}
						}

					}
					this.showMessage = true
					this.mySeats = mySeats
					this.allTickets = this.mySeats.length
					console.log(this.mySeats)
					this.numberOfTickets = 0
				}
			}
		}

	}

	EndShow(){
		this.endTheShow = true;
		this.showMessage = false;
		this.totalSeats = 0
		for(let i=0;i<this.theatre.length;i++){
			for(let j=0;j<this.theatre[i].length;j++){
				if(this.theatre[i][j].isBooked){
					this.theatre[i][j].isBooked = false
				}
			}
		}
	}

}
