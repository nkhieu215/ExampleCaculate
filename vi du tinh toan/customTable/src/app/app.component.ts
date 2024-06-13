import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { adjectives, animals, colors, names, uniqueNamesGenerator } from 'unique-names-generator';
import { faCoffee, faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Conditional } from '@angular/compiler';
import * as XLSX from'xlsx'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  url:any
  file:File |null = null;
  faCoffee = faCoffee;
  faCaretDown = faCaretDown;
  faMagnifyingGlass = faMagnifyingGlass;
  //-------------------------------------------------------- Ví dụ 1 table full chức năng------------------------------------------------------
  //Biến đóng mở popup
  openViewDetail = false;
  // Biến tìm kiếm
  @Input() searchCity: {
    name: string,
    nation: string,
    numberOfPeople: number,
    acreage: number,
  } = { name: '', nation: '', numberOfPeople: 0, acreage: 0 }
  @Input() dayStart:Date = new Date()
  @Input() dayEnd:Date = new Date()
  @Input() cases = '0';
  @Input() casesAcreage: number = 0;
  //bắt sự kiện tìm kiếm
  checkSearchEvent =false;
  /** Khởi tạo dữ liệu
   * Dữ liệu city
   * Dữ liệu family
   * Chi Tiết dữ liệu people 
   */
  city: {
    id: number,
    name: string,
    nation: string,
    numberOfPeople: number,
    acreage: number,
    dateCreate: Date
  }[] = [
      { id:999999, name: "Hà Giang", nation: "Trung du và miền núi phía Bắc", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1700000000000) },
      { id: 2, name: "Hà Nội", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1710000000000) },
      { id: 3, name: "Vĩnh Phúc", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1720000000000) },
      { id: 4, name: "Bắc Ninh", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1730000000000) },
      { id: 5, name: "Quảng Ninh", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1740000000000) },
      { id: 6, name: "Hải Dương", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1750000000000) },
      { id: 7, name: "Hải Phòng", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1760000000000) },
      { id: 8, name: "Hưng Yên", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1770000000000) },
      { id: 9, name: "Thái Bình", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1780000000000) },
      { id: 10, name: "Hà Nam", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1790000000000) },
      { id: 11, name: "Nam Định", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1800000000000) },
      { id: 12, name: "Ninh Bình", nation: "Đồng bằng sông Hồng", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1810000000000) },
      { id: 13, name: "Hà Giang", nation: "Trung du và miền núi phía Bắc", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1820000000000) },
      { id: 14, name: "Cao Bằng", nation: "Trung du và miền núi phía Bắc", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1830000000000) },
      { id: 15, name: "Bắc Kạn", nation: "Trung du và miền núi phía Bắc", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1840000000000) },
      { id: 16, name: "Tuyên Quang", nation: "Trung du và miền núi phía Bắc", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1850000000000) },
      { id: 17, name: "Lào Cai", nation: "Trung du và miền núi phía Bắc", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1860000000000) },
      { id: 18, name: "Yên Bái", nation: "Trung du và miền núi phía Bắc", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1870000000000) },
      { id: 19, name: "Thái Nguyên", nation: "Trung du và miền núi phía Bắc", numberOfPeople: this.getRandomInt(100000), acreage: this.getRandomInt(100000), dateCreate: new Date(1880000000000) },
    ]
  family: {
    id: number,
    phoneNumber: string,
    numberOfPeople: number,
    city: {
      id: number,
      name: string,
      nation: string,
      numberOfPeople: number,
      acreage: number,
      dateCreate: Date
    }
  }[] = [
      { id: 1, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 2, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 3, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 4, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 5, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 6, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 7, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 8, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 9, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[1] },
      { id: 10, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[2] },
      { id: 11, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[2] },
      { id: 12, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[2] },
      { id: 13, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[2] },
      { id: 14, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[2] },
      { id: 15, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[2] },
      { id: 16, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[2] },
      { id: 17, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[3] },
      { id: 18, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[3] },
      { id: 19, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[3] },
      { id: 20, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[3] },
      { id: 21, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[5] },
      { id: 22, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[5] },
      { id: 23, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[5] },
      { id: 24, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[5] },
      { id: 25, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[5] },
      { id: 26, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[5] },
      { id: 27, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[7] },
      { id: 28, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[7] },
      { id: 29, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[7] },
      { id: 30, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[7] },
      { id: 31, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[7] },
      { id: 32, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[7] },
      { id: 33, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[7] },
      { id: 34, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[11] },
      { id: 35, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[11] },
      { id: 36, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[11] },
      { id: 37, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[11] },
      { id: 38, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[11] },
      { id: 39, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[15] },
      { id: 40, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[15] },
      { id: 41, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[15] },
      { id: 42, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[15] },
      { id: 43, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[15] },
      { id: 44, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[15] },
      { id: 45, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[15] },
      { id: 46, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[17] },
      { id: 47, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[17] },
      { id: 48, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[17] },
      { id: 49, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[17] },
      { id: 50, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[10] },
      { id: 51, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[10] },
      { id: 52, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[10] },
      { id: 53, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[19] },
      { id: 54, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[19] },
      { id: 55, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[19] },
      { id: 56, phoneNumber: `03${this.getRandomInt(10000000)}`, numberOfPeople: this.getRandomInt(10), city: this.city[19] },
    ]
  viewFamily: {
    id: number,
    phoneNumber: string,
    numberOfPeople: number,
    city: {
      id: number,
      name: string,
      nation: string,
      numberOfPeople: number,
      acreage: number,
      dateCreate: Date
    }
  }[] = [];
  people: {
    id: number,
    name: string,
    age: number,
    family: {
      id: number,
      phoneNumber: string,
      numberOfPeople: number,
      city: {
        id: number,
        name: string,
        nation: string,
        numberOfPeople: number,
        acreage: number,
        dateCreate: Date
      }
    }
  }[] = []
  //khởi tạo dữ liệu gốc
  sourceCity: any[]=[];
  sourceFamily: any[]=[];
  sourcePeople: any[]=[];
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  getPeople() {
    for (let i = 0; i < 150; i++) {
      const item: {
        id: number,
        name: string,
        age: number,
        family: {
          id: number,
          phoneNumber: string,
          numberOfPeople: number,
          city: {
            id: number,
            name: string,
            nation: string,
            numberOfPeople: number,
            acreage: number,
            dateCreate: Date
          }
        }
      } = {
        id: i + 1, name: uniqueNamesGenerator({
          length: 2, separator: ' ',
          dictionaries: [adjectives, colors, names]
        }), age: this.getRandomInt(70), family: this.family[this.getRandomInt(56)]
      }
      this.people.push(item);
      this.sourcePeople.push(item);
    }
  }
  ngOnInit() {
    this.getPeople()
    this.sourceCity = this.city;
    this.sourceFamily = this.family;
    console.log("test", this.sourceCity)
    //mở lại sự kiện đang thực hiện
    if(sessionStorage.getItem("checkSearchEvent")==="true"){
      this.cases = sessionStorage.getItem("conditionKey")!;
      this.searchCity = JSON.parse(sessionStorage.getItem("searchKey")!)
      this.searchCityByProperties()
    }
    this.city[0]['id'] = 555555;
    console.log(this.city[0]['id'])
  }
  checkCases() {
    console.log(this.cases)
  }
  //Hàm tìm kiếm theo nhiều trường thông tin
  //Tìm kiếm khi chọn điều kiện
  searchCityByProperties() {
    sessionStorage.setItem("searchKey",JSON.stringify(this.searchCity));
    sessionStorage.setItem("conditionKey",this.cases);
    sessionStorage.setItem("checkSearchEvent","true");
    switch (this.cases) {
      case '1': {//>
        console.log("1",this.cases)
        console.log(this.sourceCity)
        // lớn hơn
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople > this.searchCity.numberOfPeople && item.acreage >= this.searchCity.acreage);
        // this.searchCityByAcreage();
        break;
      }
      case '2': {
        console.log("2",this.cases)
        console.log(this.sourceCity)
        // nhỏ hơn
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople < this.searchCity.numberOfPeople && item.acreage >=this.searchCity.acreage);
        // this.searchCityByAcreage();
        break;
      }
      case '3': {
        console.log("3",this.cases)
        console.log(this.sourceCity)
        // bằng
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople === this.searchCity.numberOfPeople && item.acreage >= this.searchCity.acreage);
        // this.searchCityByAcreage();
        break;
      }
      case '4': {
        console.log("4",this.cases)
        console.log(this.sourceCity)
        // khác
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople !== this.searchCity.numberOfPeople && item.acreage >= this.searchCity.acreage);
        // this.searchCityByAcreage();
        break;
      }
      default: {

        // mặc định
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople >= this.searchCity.numberOfPeople && item.acreage >= this.searchCity.acreage);
        // this.searchCityByAcreage();
        break;
      }
    }
  }
  //chọn điều kiện diện tích
  searchCityByAcreage() {
    console.log(this.searchCity)
    switch (this.casesAcreage) {
      case 1: {//>
        // lớn hơn
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople >= this.searchCity.numberOfPeople && item.acreage > this.searchCity.acreage);
        break;
      }
      case 2: {
        // nhỏ hơn
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople >= this.searchCity.numberOfPeople && item.acreage < this.searchCity.acreage);
        break;
      }
      case 3: {
        // bằng
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople >= this.searchCity.numberOfPeople && item.acreage === this.searchCity.acreage);
        break;
      }
      case 4: {
        // khác
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople >= this.searchCity.numberOfPeople && item.acreage !== this.searchCity.acreage);
        break;
      }
      default: {

        // mặc định
        this.city = this.sourceCity.filter((item: {
          id: number,
          name: string,
          nation: string,
          numberOfPeople: number,
          acreage: number,
          dateCreate: Date
        }) => item.name.toLowerCase().includes(this.searchCity!.name) && item.nation.toLowerCase().includes(this.searchCity!.nation) && item.numberOfPeople >= this.searchCity.numberOfPeople && item.acreage >= this.searchCity.acreage);
        break;
      }
    }
  }
  //Tìm kiếm theo khoảng thời gian
  searchByRange(){
    console.log("start: ",this.dayStart);
    console.log("end: ",this.dayEnd);
    this.city = this.sourceCity.filter((item:{
      id: number,
      name: string,
      nation: string,
      numberOfPeople: number,
      acreage: number,
      dateCreate: Date
    })=> item.dateCreate.getDate >= this.dayStart.getDate && item.dateCreate.getDate <= this.dayEnd.getDate )
  }
  //Hàm view chi tiết dạng tree
  viewFamilyByCity(id: number) {
    this.openViewDetail = !this.openViewDetail;
    if (this.openViewDetail === true) {
      this.viewFamily = this.family.filter(item => item.city.id === id);
    }
  }
  handleFileInput(event:any){
    console.log(event)
    const target :DataTransfer = <DataTransfer>(event.target)
    const reader :FileReader = new FileReader();
    reader.onload =(e:any)=>{
      const bstr:string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr,{type:'binary'})
      const wsname: string = wb.SheetNames[0]
      const ws: XLSX.WorkSheet = wb.Sheets[wsname]
      console.log(ws)
    };
    reader.readAsBinaryString(target.files[0])
  }
}
