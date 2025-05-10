
document.addEventListener("DOMContentLoaded", function () {
    let dem = 0;
    // Tự động focus vào input txtTen khi trang được tải
    document.getElementById("txtTen").focus();

    // Kiểm tra họ tên khi rời khỏi input
    document.getElementById("txtTen").addEventListener("blur", function () {
        let ten = document.getElementById("txtTen").value;
        let kt = /^([A-Z][a-z]*\s)*([A-Z][a-z]*)$/; // Regex kiểm tra tên
        let erTen = document.getElementById("erTen");

        if (ten === "") {
            erTen.innerHTML = "không được để rỗng";
            erTen.classList.add("mauDo");
            return false;
        } else {
            if (!kt.test(ten)) {
                erTen.innerHTML = "sai cú pháp";
                erTen.classList.add("mauDo");
                return false;
            } else {
                erTen.innerHTML = "*";
                erTen.classList.remove("mauDo");
                return true;
            }
        }
    });

    // Kiểm tra số điện thoại khi rời khỏi input
    document.getElementById("txtSDT").addEventListener("blur", function () {
        let sdt = document.getElementById("txtSDT").value;
        let kt = /^039\d{7}$/; // Regex kiểm tra số điện thoại
        let erSDT = document.getElementById("erSDT");

        if (sdt === "") {
            erSDT.innerHTML = "không được để rỗng";
            erSDT.classList.add("mauDo");
            return false;
        } else {
            if (!kt.test(sdt)) {
                erSDT.innerHTML = "sai cú pháp (039XXXXXX)";
                erSDT.classList.add("mauDo");
                return false;
            } else {
                erSDT.innerHTML = "*";
                erSDT.classList.remove("mauDo");
                return true;
            }
        }
    });

    // Kiểm tra ngày sinh (tuổi) khi rời khỏi input
    document.getElementById("Ngay").addEventListener("blur", function () {
        let ngay = document.getElementById("Ngay").value;
        ngay = parseInt(ngay);
        let erNgay = document.getElementById("erNgay");

        if (isNaN(ngay)) {
            erNgay.innerHTML = "ngày không hợp lệ";
            erNgay.classList.add("mauDo");
            return false;
        } else {
            if (ngay <= 15 || ngay >= 18) {
                erNgay.innerHTML = "lớn hơn 15 dưới 18";
                erNgay.classList.add("mauDo");
                return false;
            } else {
                erNgay.innerHTML = "*";
                erNgay.classList.remove("mauDo");
                return true;
            }
        }
    });

    // Kiểm tra địa chỉ khi rời khỏi input
    document.getElementById("txtDC").addEventListener("blur", function () {
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
    });

    // Hàm tính học phí dựa trên khóa học
    function ktKhoa(gt) {
        if (gt === "2 tuần") {
            return 5000000;
        }
        if (gt === "4 tuần") {
            return 8000000;
        }
        if (gt === "6 tuần") {
            return 9000000;
        }
    }

    // Xử lý sự kiện click nút "Đăng ký"
    document.getElementById("btnDK").addEventListener("click", function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
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
        let modal = document.getElementById("myModal");
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        let backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
            backdrop.remove();
        }
    });
});