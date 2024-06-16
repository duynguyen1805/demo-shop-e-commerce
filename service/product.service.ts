import axios from "../utils/axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const BACKEND_URL = "http://192.168.1.58:4000";
// const BACKEND_URL = "https://twohandmarket-be.onrender.com";

export async function Get_list_product(
  limit?: number,
  sort?: "ctime",
  page?: 1,
  filter?: { isPublished: true },
  select?: [
    "_id",
    "product_name",
    "product_thumbnail",
    "product_price",
    "product_ratingsAverage"
  ]
) {
  try {
    const response = await axios.post(`${BACKEND_URL}/product/find_all`);
    const data = await response.data.metadata;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("call Get_list_product không thành công !");
  }
}
