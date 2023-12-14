"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Form } from "@/components/Form";

export function Client() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <div className={styles.contact}>
      <div className={styles.profile}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src="/profile.jpg"
            alt="プロフィール画像"
            fill
          />
        </div>
        <div className={styles.comment}>
          <p>
            <a
              className={styles.link}
              href="https://fukurou-labo.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              フクロウラボ
            </a>
            所属のフロントエンドエンジニア だいちです。
            <br />
            殆ど自分のためのメモとしてブログを書いています。
            <br />
            フクロウラボでは随時エンジニアを募集中なのでご興味がある方も是非お声がけください！
          </p>
          <p className={styles.note}>
            ※
            当サイトに記載されている発言や見解については、所属組織を代表するものではありません。
          </p>
        </div>
      </div>
      <h1>Contact</h1>
      <GoogleReCaptchaProvider
        language="ja"
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      >
        <Form isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
      </GoogleReCaptchaProvider>
    </div>
  );
}
