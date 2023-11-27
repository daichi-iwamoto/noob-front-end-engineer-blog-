import * as React from "react";
import Image from "next/image";

export const Profile = () => {
  return (
    <div className="profileBox">
      <div className="profileImg">
        <Image
          src="/profile.jpg"
          alt="プロフィール画像"
          width={30}
          height={30}
        />
      </div>
      <div className="profileContents">
        <p>
          <a
            href="https://fukurou-labo.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            （株）フクロウラボ
          </a>
          所属 フロントエンドエンジニアのだいちです。
          <br />
          記事についてのご指摘、ご質問等あればお問合せください。
          <br />
          フクロウラボでは随時エンジニアを募集中なので、フクロウラボに興味がある方も是非お声がけください！
        </p>
        <p className="note">
          ※
          当サイトに記載されている発言や見解については、所属組織を代表するものではありません。
        </p>
      </div>
    </div>
  );
};
