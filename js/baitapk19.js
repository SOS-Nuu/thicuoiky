document.addEventListener("DOMContentLoaded", function () {
    let dem = 0;

    document.getElementById("patientId").focus();
    //valitdate BN-12345
    const validateTen = () => {
        let maBenhNhan = document.getElementById("patientId").value;
        const rexmaBenhNhan = /^BN-[0-9]{5}$/;  //BN-YYYYY
        let errmaBenhNhan = document.getElementById("patientIdError");

        if (maBenhNhan === "") {
            errmaBenhNhan.innerHTML = "Mã bệnh nhân không được để trống"
            return false;
        } else if (!rexmaBenhNhan.test(maBenhNhan)) {
            errmaBenhNhan.innerHTML = "Mã bệnh nhân không hợp lệ, vui lòng nhập theo định dạng BN-YYYYY"
            return false;
        } else {
            errmaBenhNhan.innerHTML = ""; // Xóa thông báo lỗi nếu hợp lệ
            return true;
        }
    }
    document.getElementById("patientId").addEventListener("blur", validateTen);
    //input = oncahge nó sẽ chạy lại khi có sự thay đổi

    
    // validate so kham
    const valdidatesokham = () => {
        let soKham = document.getElementById("medicalFile").value;
        let errsokham = document.getElementById("medicalFileError");
        const rexsokhambenh = /\.(jpg|png|gif)$/i;

        if (soKham === "") {
            errsokham.innerHTML = "so kham khong duoc de trong"
            return false;
        } else if (!rexsokhambenh.test(soKham)) {
            errsokham.innerHTML = "so kham benh không hợp lệ jpg png "
            return false;
        } else {
            errsokham.innerHTML = ""; // Xóa thông báo lỗi nếu hợp lệ
            return true;
        }
    }
  document.getElementById("medicalFile").addEventListener("blur", valdidatesokham);
  
  //validate booking date
    // document.getElementById("bookingDate").focus();
    const validateBookingDate = () => {
      let dayBoongking = document.getElementById("bookingDate").value;
      let errBooking = document.getElementById("bookingDateError");
      const rexBooking = new Date(); 
      const bookingDate = new Date(dayBoongking);
      // console.log(rexBooking);
      // console.log(bookingDate);
      if (dayBoongking === "") {
          errBooking.innerHTML = "ngày đăng ký  không được để trống"
          return false;
      } else if (rexBooking.getTime() > bookingDate.getTime()) {
          errBooking.innerHTML = "ngay dang ky khong hop le"
          return false;
      } else {
          errBooking.innerHTML = ""; // Xóa thông báo lỗi nếu hợp lệ
          return true;
      }
  }
  document.getElementById("bookingDate").addEventListener("blur", validateBookingDate);


  // validate checkbox
  // Validate loại dịch vụ (ít nhất một checkbox phải được chọn)
    const validateServices = () => {
        let services = Array.from(document.querySelectorAll('input[type="checkbox"]')); // Chuyển NodeList thành Array
        console.log("services",services);
        let checkedServices = services.filter(checkbox => checkbox.checked); // Lọc các checkbox được chọn
        console.log("checkedServices",checkedServices);
       let  valueLabel = checkedServices.map(checkbox => {
            let label = document.querySelector(`label[for="${checkbox.id}"]`);
            console.log("label",label);
            return label.textContent.trim();
        });
        console.log("valueLabel",valueLabel);
        let valueServices = checkedServices.map(checked => checked.value); // Lấy giá trị của các checkbox được chọn
        console.log(valueServices);
        let errServices = document.getElementById("servicesError");
        let total = valueServices.reduce((sum, value) => sum + parseInt(value), 0);
        console.log(total);
        document.getElementById("totalCost").value = total;

        if (checkedServices.length === 0) {
            errServices.innerHTML = "Vui lòng chọn ít nhất một loại dịch vụ";
            return false;
        } else {
            errServices.innerHTML = "";
            totalCost.innerHTML = total
            return true;
        }
    };


  // Lấy danh sách checkbox dưới dạng Array và gắn sự kiện change
  //validate checkbox
    let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", validateServices);
    });
    let Khoa = document.getElementById("selectKhoa").value;
    console.log(Khoa);

        //validate so kham
    const selecoption = () => {
        Khoa = document.getElementById("selectKhoa").value;
        console.log(Khoa);
    
            if (Khoa === "") {
                return false;
            } else{
                return true;
            }
        }
    document.getElementById("selectKhoa").addEventListener("change", selecoption);
  
  
  // Validate radio button
  const validateRadio = () => {
    // Lấy radio được chọn
    const checkedRadio = document.querySelector('input[name="optradio"]:checked');
    const errRadio = document.getElementById('radioError');
  
    // Kiểm tra xem có radio nào được chọn không
    if (checkedRadio) {
      errRadio.innerHTML = ''; // Xóa thông báo lỗi
      console.log('Selected radio value:', checkedRadio.value);
      return true;
    } else {
      errRadio.innerHTML = 'Vui lòng chọn một tùy chọn'; // Hiển thị lỗi
      return false;
    }
  };
  
  // Lấy tất cả radio buttons không bị disabled
  const radios = document.querySelectorAll('input[name="optradio"]:not(:disabled)');
  
  // Gắn sự kiện change cho từng radio
  if (radios.length > 0) {
    radios.forEach((radio) => {
      radio.addEventListener('change', validateRadio);
    });
  } else {
    console.warn('Không tìm thấy radio buttons với name="optradio"');
  }
  
  
    // Xử lý sự kiện click nút "Đăng ký"
    document.getElementById("datlich").addEventListener("click", function (event) {
      event.preventDefault();
      // event.stopImmediatePropagation();
      let isValidTen = validateTen();
      let isValidsokham = valdidatesokham();
      let isValidBooking = validateBookingDate();
      let isValidService = validateServices();
      let isValidSelect = selecoption();
      let isValidRadio = validateRadio();

      if (!isValidTen) {
          document.getElementById("patientId").focus();
      } else if (!isValidsokham){
          document.getElementById("medicalFile").focus();
      } else if (!isValidBooking) {
          document.getElementById("bookingDate").focus();
      } else if (!isValidService){
          document.getElementById("service1").focus();
      } else if (!isValidSelect) {
          document.getElementById("selectKhoa").focus();
      } else if (!isValidRadio) {
          document.getElementById("radio1").focus();
      } else {
        dem++;
        
        let maBenhNhan = document.getElementById("patientId").value;
        let soKham = document.getElementById("medicalFile").value;
        let dayBoongking = document.getElementById("bookingDate").value;
        let valueLabel = document.querySelector('input[name="optradio"]:checked').value;
        let valueServices = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => {
            let label = document.querySelector(`label[for="${checkbox.id}"]`);
          return label.textContent.trim();
        });
        let total = document.getElementById("totalCost").value;
        let radios = document.querySelector('input[name="optradio"]:checked').value;

        
          // console.log("dem:", dem);
          // console.log("maBenhNhan:", maBenhNhan);
          // console.log("soKham:", soKham);
          // console.log("dayBoongking:", dayBoongking);
          // console.log("valueServices:", valueServices);
          // console.log("total:", total);
          // console.log("radios:", radios);
          let them = `<tr><td>${dem}</td><td>${maBenhNhan}</td><td><img src="${sokham}" alt=""></td><td>${dayBoongking}</td><td>${total}</td><td>${valueLabel}</td><td>${radios}</td></tr>`;

          document.getElementById("bookingTable").innerHTML += them;


            // Đóng modal bằng cách kích hoạt data-bs-dismiss
            let modal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
                  modal.hide();
          // Kích hoạt hành vi đóng modal
          // document.getElementById("btnDK").removeAttribute("data-bs-dismiss"); // Xóa thuộc tính sau khi đóng
          document.getElementById("patientId").value = "";
          document.getElementById("medicalFile").value = "";
        document.getElementById("bookingDate").value = "";
        document.getElementById("comment").value = "";

        // document.getElementById("selectKhoa").value = "";
        // Reset checkbox
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          checkbox.checked = false;
      });
      // Reset radio
      document.querySelectorAll('input[name="optradio"]').forEach(radio => {
          radio.checked = false;
      });
        

      }


  })



});