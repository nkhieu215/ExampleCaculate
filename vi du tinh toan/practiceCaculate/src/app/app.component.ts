import { Component } from '@angular/core';
import { count } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practiceCaculate';
  // -------------------------------------------- Bài toán 1 ---------------------------------------------------
  //------------------------------------------ Khởi tạo biến 
  openTable = false;
  openBaiToan1 = false;
  //Ví dụ tính toán số lượng tiếp nhận
  // ------------------- Khởi tạo dữ liệu (lấy dữ liệu từ DB thông qua API) thong tin san pham
  data:{id:number,tenSanPham:string,doiMoi:number, suaChua:number, khongBaoHanh:number}[] =[
    {id:1,tenSanPham:'san pham a', doiMoi:1, suaChua:2,khongBaoHanh:3},
    {id:2,tenSanPham:'san pham b', doiMoi:2, suaChua:2,khongBaoHanh:3},
    {id:3,tenSanPham:'san pham c', doiMoi:3, suaChua:2,khongBaoHanh:3},
    {id:4,tenSanPham:'san pham d', doiMoi:4, suaChua:2,khongBaoHanh:3},
    {id:5,tenSanPham:'san pham e', doiMoi:5, suaChua:2,khongBaoHanh:3},
    {id:6,tenSanPham:'san pham f', doiMoi:55, suaChua:2,khongBaoHanh:3},
    {id:7,tenSanPham:'san pham g', doiMoi:6, suaChua:2,khongBaoHanh:3},
    {id:8,tenSanPham:'san pham h', doiMoi:10, suaChua:2,khongBaoHanh:3},
    {id:9,tenSanPham:'san pham i', doiMoi:11, suaChua:2,khongBaoHanh:3},
    {id:10,tenSanPham:'san pham k', doiMoi:21, suaChua:2,khongBaoHanh:3},
    {id:11,tenSanPham:'san pham l', doiMoi:15, suaChua:2,khongBaoHanh:3},
    {id:12,tenSanPham:'san pham m', doiMoi:19, suaChua:2,khongBaoHanh:3},
    {id:13,tenSanPham:'san pham n', doiMoi:17, suaChua:2,khongBaoHanh:3},
    {id:14,tenSanPham:'san pham o', doiMoi:13, suaChua:2,khongBaoHanh:3},
  ]
  //--------------------- Khởi tạo thông tin số lượng đã tồn
  data2:{soLuongTon:number;idData1: number}[] = [
    {soLuongTon:1,idData1:1 },
    {soLuongTon:2,idData1:2 },
    {soLuongTon:3,idData1:3 },
    {soLuongTon:4,idData1:4 },
    {soLuongTon:5,idData1:5 },
    {soLuongTon:6,idData1:6 },
    {soLuongTon:7,idData1:7 },
    {soLuongTon:6,idData1:8 },
    {soLuongTon:5,idData1:9 },
    {soLuongTon:8,idData1:10 },
    {soLuongTon:10,idData1:11 },
    {soLuongTon:11,idData1:12},
    {soLuongTon:12,idData1:13 },
    {soLuongTon:15,idData1:14 },
  ]
  // ----------------------  xử lý dữ liệu 
  data1:{tenSanPham:string,doiMoi:number, suaChua:number, khongBaoHanh:number,soLuongDaNhan:number,soLuongConLai:number}[] = []
  // tính toán số lượng đã nhận
  caculate(){
    this.openTable = true;
    for(let i = 0;i<this.data.length;i++){
      // tạo 1 phần tử chứa thông tin của sản phẩm
      const item = {
        tenSanPham: this.data[i].tenSanPham,
        doiMoi: this.data[i].doiMoi,
        suaChua: this.data[i].suaChua, 
        khongBaoHanh: this.data[i].khongBaoHanh, 
        soLuongDaNhan:this.data[i].doiMoi + this.data[i].suaChua + this.data[i].khongBaoHanh, 
        soLuongConLai:this.data[i].doiMoi + this.data[i].suaChua + this.data[i].khongBaoHanh - this.data2[i].soLuongTon}
        this.data1.push(item);
      // công thức tính toán số lượng đã nhận
      // this.data1[i].khongBaoHanh = this.data[i].doiMoi + this.data[i].suaChua + this.data[i].khongBaoHanh
    }
    alert('Đã hoàn thành tính toán');
  }
  openModelBaiToan1(){
    if(this.openBaiToan1 === true){
      this.openBaiToan1 = false
    }else{
      this.openBaiToan1 = true;
    }
  }
  //-------------------------------------------------------------- Bài toán 2 ------------------------------------------------------
  openTableBaiToan2 = false;
  openBaiToan2 = false;
  // dữ lieu thông tin sản phẩm
  dataBT2: {tenSanPham:string, id:number}[]=[
    {tenSanPham:"Bóng đèn tube",id:1},
    {tenSanPham:"Bóng đèn LED",id:2},
    {tenSanPham:"Bóng đèn DownLight",id:3},
    {tenSanPham:"Bóng đèn LED khung vuông",id:4},
  ]
  // dữ liệu thông tin trạng thái
  data1BT2:{tenTrangThai:string,id:number}[]=[
    {tenTrangThai:"Đổi mới",id:1},
    {tenTrangThai:"Sửa chữa",id:2},
    {tenTrangThai:"Không bảo hành",id:3},
  ]
  //dữ liệu thông tin số lượng tiếp nhận theo trạng thái
  data2BT2: {soLuong:number,dataBT2Id:number,data1BT2Id:number}[]=[
    {soLuong:5,dataBT2Id:1,data1BT2Id:1},
    {soLuong:10,dataBT2Id:1,data1BT2Id:2},
    {soLuong:6,dataBT2Id:1,data1BT2Id:3},
    {soLuong:2,dataBT2Id:2,data1BT2Id:1},
    {soLuong:15,dataBT2Id:2,data1BT2Id:2},
    {soLuong:21,dataBT2Id:2,data1BT2Id:3},
    {soLuong:87,dataBT2Id:3,data1BT2Id:1},
    {soLuong:43,dataBT2Id:3,data1BT2Id:2},
    {soLuong:25,dataBT2Id:3,data1BT2Id:3},
    {soLuong:87,dataBT2Id:4,data1BT2Id:1},
    {soLuong:56,dataBT2Id:4,data1BT2Id:2},
    {soLuong:43,dataBT2Id:4,data1BT2Id:3},
  ]
  // dữ liệu hiển thị giao diện
  data3BT2: any[] = [];
  // hàm xử lý dữ liệu
  showData(){
    //set thong tin cua danh sach san pham => để tạo thông tin sản phẩm tổng hợp
    for(let i = 0;i< this.dataBT2.length;i++){
      const item = {tenSanPham:this.dataBT2[i].tenSanPham, slDoiMoi:0,slSuaChua:0,slKhongBaoHanh:0};
      // set thông tin chi tiết số lượng của sản phẩm theo từng trạng thái
      for(let j = 0;j<this.data2BT2.length;j++){
        //so sánh tên sản phẩm 
        if(this.dataBT2[i].id === this.data2BT2[j].dataBT2Id){
           // fix cứng từng trường hợp trạng thái 
          if(this.data2BT2[j].data1BT2Id === 1){
            item.slDoiMoi = this.data2BT2[j].soLuong;
          }
          if(this.data2BT2[j].data1BT2Id === 2){
            item.slSuaChua = this.data2BT2[j].soLuong;
          }
          if(this.data2BT2[j].data1BT2Id === 3){
            item.slKhongBaoHanh = this.data2BT2[j].soLuong;
          }
        }
      }
      // lưu thông tin vào biến hiển thị giao diện
      this.data3BT2.push(item);
    }
    alert("sắp xếp thành công")
  }
  openModelBaiToan2(){
    if(this.openBaiToan2 === true){
      this.openBaiToan2 = false
    }else{
      this.openBaiToan2 = true;
    }
  }
}
