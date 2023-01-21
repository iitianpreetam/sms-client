import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { AppDispatch } from "@/store";
import { refreshTokenThunk } from "@/features/authSlice";
import Layout from "@/hocs/Layout";
import LoaderBackdrop from "@/components/LoaderBackdrop";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const notify = (msg: string) => toast(msg, {
    toastId: 'hoemPage'
  });

  const [mounted, setMounted] = useState<boolean>(false);

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
      });
    setMounted(true);
  }, []);

  if(!mounted) return <LoaderBackdrop />;

  return (
    <Layout>
      Hllo
    
    </Layout>
  );
};

export default HomePage;