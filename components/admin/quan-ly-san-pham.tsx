"use client";
import React, { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns_table_product } from "./columns-table-product";
import { DataTable_product } from "./data-table-product";

// firestore firebase
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase.config";

type build_data_product = {
  title: string;
  type_danhmuc: string;
  type_product: string;
  quantity: number;
  price: number;
  persent_discount: number;
  price_after_discount: number;
  mota: string;
  img_arr: [];
  // hang_laptop: hang_laptop,
  // ram_laptop: ram_laptop,
  // ocung_laptop: ocung_laptop,
  // manhinh_laptop: manhinh_laptop,
};

const Quan_ly_san_pham = () => {
  const [arrProduct, setArr_Product] = useState<any[]>([]);

  const [avatar, setAvatar] = useState<any>();
  const [img, setImgAvatar] = useState<any>();
  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleFile = async (e: any) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await getBase64(file);
      let objectURL = URL.createObjectURL(file);
      setImgAvatar(base64);
      setAvatar(objectURL);
    }
  };

  // refesh data san pham
  useEffect(() => {
    const fetching_data_product = async () => {
      try {
        const CollectionRef = collection(db, "store");
        const querySnapshot = await getDocs(CollectionRef);

        const products: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setArr_Product(products);
        // console.log("check arr_user: ", querySnapshot);
        // console.log("arr_product from firebase: ", arrProduct);
      } catch (error) {
        console.error("error fetching infor users from firebase: ", error);
      }
    };

    fetching_data_product();
  }, [arrProduct.length]);

  return (
    <div className="h-full w-full pt-0">
      <div className="h-full w-full overflow-auto">
        <DataTable_product columns={columns_table_product} data={arrProduct} />
      </div>
    </div>
  );
};

export default Quan_ly_san_pham;
