interface Interface_Danhmuc {
  id: number;
  title: string;
  img_url: string;
  url: string;
  danhmuc_chitiet?: Interface_danhmucchitiet[];
}

interface Interface_danhmucchitiet {
  id: number;
  title: string;
  type: string;
  filter_option?: filter_laptop;
}

type filter_laptop = {
  hang: any[];
  ram: any[];
  ocung: any[];
  manhinh: any[];
};

export const DANHMUC: Interface_Danhmuc[] = [
  {
    id: 0,
    title: "Thời trang nam",
    img_url:
      "https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn",
    url: "/danhmuc/thoi-trang-nam",
  },
  {
    id: 1,
    title: "Điện thoại, phụ kiện",
    img_url:
      "https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca_tn",
    url: "/danhmuc/dien-thoai-phu-kien",
  },
  {
    id: 2,
    title: "Thiết bị điện tử",
    img_url:
      "https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5_tn",
    url: "/danhmuc/thiet-bi-dien-tu",
  },
  {
    id: 3,
    title: "Desktop, Laptop",
    img_url:
      "https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d_tn",
    url: "/danhmuc/may-tinh-lap-top",
    danhmuc_chitiet: [
      {
        id: 0,
        title: "Máy tính bàn",
        type: "maytinhban",
      },
      {
        id: 1,
        title: "Laptop",
        type: "laptop",
        filter_option: {
          hang: ["Apple", "Asus", "MSI", "HP", "Acer", "Dell", "Lenovo"],
          ram: ["8GB", "16GB", "32GB", "64GB"],
          ocung: ["128GB", "256GB", "512GB", "1TB", "2TB"],
          manhinh: ["14inch", "15inch", "16inch"],
        },
      },
      {
        id: 2,
        title: "Linh kiện máy tính",
        type: "linhkienmaytinh",
      },
      {
        id: 3,
        title: "Thiết bị mạng",
        type: "thietbimang",
      },
      {
        id: 4,
        title: "Laptop Gaming",
        type: "laptopgaming",
      },
      {
        id: 5,
        title: "Thiết bị lưu trữ",
        type: "thietbiluutru",
      },
    ],
  },
  {
    id: 4,
    title: "Máy ảnh, quay phim",
    img_url:
      "https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d_tn",
    url: "/danhmuc/may-anh-quay-phim",
  },
  {
    id: 5,
    title: "Đồng hồ",
    img_url:
      "https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn",
    url: "/danhmuc/dong-ho",
  },
  {
    id: 6,
    title: "Giày dép",
    img_url:
      "https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de_tn",
    url: "/danhmuc/giay-dep",
  },
  {
    id: 7,
    title: "Đồ gia dụng",
    img_url:
      "https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857_tn",
    url: "/danhmuc/do-gia-dung",
  },
  {
    id: 8,
    title: "Xe máy, xe đạp",
    img_url:
      "https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334_tn",
    url: "/danhmuc/xe-may",
  },
  {
    id: 9,
    title: "Thời trang nữ",
    img_url:
      "https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d_tn",
    url: "/danhmuc/thoi-trang-nu",
  },
];
