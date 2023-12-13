"use client";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import styles from "@/app/contact/page.module.css";
import toast, { Toaster } from "react-hot-toast";

type FormValues = {
  name: string;
  mail: string;
  body: string;
};

type FormProps = {
  isSubmitting: boolean;
  setIsSubmitting: (newValue: boolean) => void;
};

export function Form({ isSubmitting, setIsSubmitting }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    toast.loading("送信中", {
      position: "bottom-center",
      style: {
        padding: "1rem 2rem",
      },
    });

    if (!executeRecaptcha) {
      setIsSubmitting(false);
      return;
    }

    const token = await executeRecaptcha("contact");

    await window
      .fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...data, token }),
      })
      .then((res) => {
        console.log(res);
      });

    setIsSubmitting(false);
    toast.remove();
    toast.success("送信完了", {
      position: "bottom-center",
      style: {
        color: "#fff",
        backgroundColor: "#7472ff",
        padding: "1rem 2rem",
      },
    });
  });

  return (
    <>
      <Toaster />
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputs}>
          <label htmlFor="name">お名前</label>
          <input id="name" {...register("name")} type="text" required />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="contact">ご連絡先</label>
          <input id="mail" {...register("mail")} type="email" required />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="detail">お問合せ内容</label>
          <textarea id="body" {...register("body")} required />
        </div>
        <div className={styles.submit}>
          <input type="submit" value="送信" />
        </div>
      </form>
    </>
  );
}
