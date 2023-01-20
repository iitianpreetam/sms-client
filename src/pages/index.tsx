import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { AppDispatch } from "@/store";
import { refreshTokenThunk } from "@/features/authSlice";
import Layout from "@/hocs/Layout";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const notify = (msg: string) => toast(msg, {
    toastId: 'hoemPage'
  });

  useEffect(() => {
    dispatch(refreshTokenThunk())
      .then(unwrapResult)
      .then(originalPromiseResult => {
        // console.log(originalPromiseResult)
        return;
      })
      .catch(rejectedValueOrSerializedError => {
        setTimeout(() => {
          notify(rejectedValueOrSerializedError.error);
        }, 1000)
        router.push('/auth/login');
      })
  }, []);

  return (
    <Layout>
      Hllo
    
    </Layout>
  );
};

export default HomePage;