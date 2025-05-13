document.addEventListener("DOMContentLoaded", function () {
  let dem = 0;
  // Tự động focus vào input txtTen khi trang được tải
  document.getElementById("txtTen").focus();

  // Hàm kiểm tra họ tên
  const validateTen = () => {
    let ten = document.getElementById("txtTen").value;
    const kt = /^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/;
    //\s ky tu khoang trang
    let erTen = document.getElementById("erTen");

    if (ten === "") {
      erTen.innerHTML = "không được để rỗng";
      erTen.classList.add("mauDo");
      return false;
    } else if (!kt.test(ten)) {
      erTen.innerHTML = "sai cú pháp (mỗi từ phải bắt đầu bằng chữ cái in hoa)";
      erTen.classList.add("mauDo");
      return false;
    } else {
      erTen.innerHTML = "*";
      erTen.classList.remove("mauDo");
      return true;
    }
  };

  // Kiểm tra họ tên khi rời khỏi input
  document.getElementById("txtTen").addEventListener("blur", validateTen);

  // Hàm kiểm tra số điện thoại
  function validateSDT() {
    let sdt = document.getElementById("txtSDT").value;
    let kt = /^0[3,7,9][0-9]{8}$/;
    let erSDT = document.getElementById("erSDT");

    if (sdt === "") {
      erSDT.innerHTML = "không được để rỗng";
      erSDT.classList.add("mauDo");
      return false;
    } else if (!kt.test(sdt)) {
      erSDT.innerHTML = "sai cú pháp (0XXX-YYYYYY, X và Y là số)";
      erSDT.classList.add("mauDo");
      return false;
    } else {
      erSDT.innerHTML = "*";
      erSDT.classList.remove("mauDo");
      return true;
    }
  }

  // Kiểm tra số điện thoại khi rời khỏi input
  document.getElementById("txtSDT").addEventListener("blur", validateSDT);

  // Hàm kiểm tra ngày sinh
  function validateNgaySinh() {
    let ngay = document.getElementById("Ngay").value;
    let erNgay = document.getElementById("erNgay");

    if (!ngay) {
      erNgay.innerHTML = "ngày không hợp lệ";
      erNgay.classList.add("mauDo");
      return false;
    }

    // Tính tuổi dựa trên ngày sinh
    let birthDate = new Date(ngay);
    console.log(birthDate);
    console.log(ngay);
    let today = new Date("2025-05-12"); // Ngày hiện tại theo đề bài
    let age = today.getFullYear() - birthDate.getFullYear();

    let monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age <= 15 || age >= 18) {
      erNgay.innerHTML = "tuổi phải lớn hơn 15 và dưới 18";
      erNgay.classList.add("mauDo");
      return false;
    } else {
      erNgay.innerHTML = "*";
      erNgay.classList.remove("mauDo");
      return true;
    }
  }

  // Kiểm tra ngày sinh khi rời khỏi input
  document.getElementById("Ngay").addEventListener("blur", validateNgaySinh);

  // Hàm kiểm tra địa chỉ
  function validateDiaChi() {
    let dc = document.getElementById("txtDC").value;
    let erDC = document.getElementById("erDC");

    if (dc === "") {
      erDC.innerHTML = "không được để rỗng";
      erDC.classList.add("mauDo");
      return false;
    } else {
      erDC.innerHTML = "*";
      erDC.classList.remove("mauDo");
      return true;
    }
  }

  // Kiểm tra địa chỉ khi rời khỏi input
  document.getElementById("txtDC").addEventListener("blur", validateDiaChi);

  // Hàm tính học phí dựa trên khóa học
  function ktKhoa(khoa) {
    if (khoa === "2 tuần") {
      return 5000000;
    }
    if (khoa === "4 tuần") {
      return 8000000;
    }
    if (khoa === "6 tuần") {
      return 9000000;
    }
  }

  // Xử lý sự kiện click nút "Đăng ký"
  document.getElementById("btnDK").addEventListener("click", function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Kiểm tra tất cả các trường và xác định ô đầu tiên không hợp lệ
    let isTenValid = validateTen();
    let isSDTValid = validateSDT();
    let isNgaySinhValid = validateNgaySinh();
    let isDiaChiValid = validateDiaChi();

    // Tìm ô input đầu tiên không hợp lệ để focus
    if (!isTenValid) {
      document.getElementById("txtTen").focus();
    } else if (!isSDTValid) {
      document.getElementById("txtSDT").focus();
    } else if (!isNgaySinhValid) {
      document.getElementById("Ngay").focus();
    } else if (!isDiaChiValid) {
      document.getElementById("txtDC").focus();
    } else {
      // Nếu tất cả các trường hợp lệ, thêm dữ liệu vào bảng
      dem++;
      let ten = document.getElementById("txtTen").value;
      let sdt = document.getElementById("txtSDT").value;
      let ngaysinh = document.getElementById("Ngay").value;
      let diachi = document.getElementById("txtDC").value;
      let khoa = document.getElementById("slKhoa").value;
      let hphi = ktKhoa(khoa);

      // Thêm dữ liệu vào bảng
      let them = `<tr><td>${dem}</td><td>${ten}</td><td>Nam</td><td>${sdt}</td><td>${ngaysinh}</td><td>${diachi}</td><td>${khoa}</td><td>${hphi}</td></tr>`;
      document.getElementById("tBcontent").innerHTML += them;

      // Đóng modal sau khi lưu

      // Đóng modal bằng cách kích hoạt data-bs-dismiss
      document.getElementById("btnDK").setAttribute("data-bs-dismiss", "modal");
      document.getElementById("btnDK").click(); // Kích hoạt hành vi đóng modal
      // document.getElementById("btnDK").removeAttribute("data-bs-dismiss"); // Xóa thuộc tính sau khi đóng

      // Reset form sau khi lưu
      document.getElementById("txtTen").value = "";
      document.getElementById("txtSDT").value = "";
      document.getElementById("Ngay").value = "";
      document.getElementById("txtDC").value = "";
      document.getElementById("slKhoa").value = "2 tuần";
    }
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//     let dem = 0;
//     // Tự động focus vào input txtTen khi trang được tải
//     document.getElementById("txtTen").focus();
//
//     // Hàm kiểm tra họ tên
//     const  validateTen = () => {
//         let ten = document.getElementById("txtTen").value;
//         const kt = /^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/;
//         let erTen = document.getElementById("erTen");
//
//         if (ten === "") {
//             erTen.innerHTML = "không được để rỗng";
//             erTen.classList.add("mauDo");
//             return false;
//         } else if (!kt.test(ten)) {
//             erTen.innerHTML = "sai cú pháp (mỗi từ phải bắt đầu bằng chữ cái in hoa)";
//             erTen.classList.add("mauDo");
//             return false;
//         } else {
//             erTen.innerHTML = "*";
//             erTen.classList.remove("mauDo");
//             return true;
//         }
//     }
//
//     // Kiểm tra họ tên khi rời khỏi input
//     document.getElementById("txtTen").addEventListener("blur", validateTen);
//
//     // Hàm kiểm tra số điện thoại
//     function validateSDT() {
//         let sdt = document.getElementById("txtSDT").value;
//         let kt = /^0[3,7,9][0-9]{8}$/;
//         let erSDT = document.getElementById("erSDT");
//
//         if (sdt === "") {
//             erSDT.innerHTML = "không được để rỗng";
//             erSDT.classList.add("mauDo");
//             return false;
//         } else if (!kt.test(sdt)) {
//             erSDT.innerHTML = "sai cú pháp (0XXX-YYYYYY, X và Y là số)";
//             erSDT.classList.add("mauDo");
//             return false;
//         } else {
//             erSDT.innerHTML = "*";
//             erSDT.classList.remove("mauDo");
//             return true;
//         }
//     }
//
//     // Kiểm tra số điện thoại khi rời khỏi input
//     document.getElementById("txtSDT").addEventListener("blur", validateSDT);
//
//     // Hàm kiểm tra ngày sinh
//     function validateNgaySinh() {
//         let ngay = document.getElementById("Ngay").value;
//         let erNgay = document.getElementById("erNgay");
//
//         if (!ngay) {
//             erNgay.innerHTML = "ngày không hợp lệ";
//             erNgay.classList.add("mauDo");
//             return false;
//         }
//
//         // Tính tuổi dựa trên ngày sinh
//         let birthDate = new Date(ngay);
//         console.log(birthDate)
//         let today = new Date("2025-05-12"); // Ngày hiện tại theo đề bài
//         let age = today.getFullYear() - birthDate.getFullYear();
//         console.log(today.getFullYear())
//
//         let monthDiff = today.getMonth() - birthDate.getMonth();
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
//
//         if (age <= 15 || age >= 18) {
//             erNgay.innerHTML = "tuổi phải lớn hơn 15 và dưới 18";
//             erNgay.classList.add("mauDo");
//             return false;
//         } else {
//             erNgay.innerHTML = "*";
//             erNgay.classList.remove("mauDo");
//             return true;
//         }
//     }
//
//     // Kiểm tra ngày sinh khi rời khỏi input
//     document.getElementById("Ngay").addEventListener("blur", validateNgaySinh);
//
//     // Hàm kiểm tra địa chỉ
//     function validateDiaChi() {
//         let dc = document.getElementById("txtDC").value;
//         let erDC = document.getElementById("erDC");
//
//         if (dc === "") {
//             erDC.innerHTML = "không được để rỗng";
//             erDC.classList.add("mauDo");
//             return false;
//         } else {
//             erDC.innerHTML = "*";
//             erDC.classList.remove("mauDo");
//             return true;
//         }
//     }
//
//     // Kiểm tra địa chỉ khi rời khỏi input
//     document.getElementById("txtDC").addEventListener("blur", validateDiaChi);
//
//     // Hàm tính học phí dựa trên khóa học
//     function ktKhoa(khoa) {
//         if (khoa === "2 tuần") {
//             return 5000000;
//         }
//         if (khoa === "4 tuần") {
//             return 8000000;
//         }
//         if (khoa === "6 tuần") {
//             return 9000000;
//         }
//     }
//
//     // Xử lý sự kiện click nút "Đăng ký"
//     document.getElementById("btnDK").addEventListener("click", function (e) {
//         e.preventDefault(); // Ngăn chặn hành vi mặc định của form
//
//         // Kiểm tra tất cả các trường trước khi thêm vào bảng
//         let isTenValid = validateTen();
//         let isSDTValid = validateSDT();
//         let isNgaySinhValid = validateNgaySinh();
//         let isDiaChiValid = validateDiaChi();
//
//         // Nếu tất cả các trường đều hợp lệ, thêm dữ liệu vào bảng
//         if (isTenValid && isSDTValid && isNgaySinhValid && isDiaChiValid) {
//             dem++;
//             let ten = document.getElementById("txtTen").value;
//             let sdt = document.getElementById("txtSDT").value;
//             let ngaysinh = document.getElementById("Ngay").value;
//             let diachi = document.getElementById("txtDC").value;
//             let khoa = document.getElementById("slKhoa").value;
//             let hphi = ktKhoa(khoa);
//
//             // Thêm dữ liệu vào bảng
//             let them = `<tr><td>${dem}</td><td>${ten}</td><td>Nam</td><td>${sdt}</td><td>${ngaysinh}</td><td>${diachi}</td><td>${khoa}</td><td>${hphi}</td></tr>`;
//             document.getElementById("tBcontent").innerHTML += them;
//
//             // Đóng modal sau khi lưu
//             let modal = document.getElementById("myModal");
//             modal.classList.remove("show");
//             modal.style.display = "none";
//             document.body.classList.remove("modal-open");
//             let backdrop = document.querySelector(".modal-backdrop");
//             if (backdrop) {
//                 backdrop.remove();
//             }
//
//             // Reset form sau khi lưu
//             document.getElementById("txtTen").value = "";
//             document.getElementById("txtSDT").value = "";
//             document.getElementById("Ngay").value = "";
//             document.getElementById("txtDC").value = "";
//             document.getElementById("slKhoa").value = "2 tuần";
//         } else {
//             // Nếu dữ liệu không hợp lệ, không làm gì cả (các thông báo lỗi đã được hiển thị)
//             console.log("Dữ liệu không hợp lệ, không thêm vào danh sách.");
//         }
//     });
// });
