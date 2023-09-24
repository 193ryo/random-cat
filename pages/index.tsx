import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
}

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  // // マウント時に画像を読み込む
  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     // 画像URLの状態を更新
  //     setImageUrl(newImage.url);
  //     // ローディング状態の更新
  //     setLoading(false);
  //   });
  // }, []);
  // ボタンクリック時に画像を読み込む
  const handleClick = async () => {
    // 読み込み中フラグを立てる
    setLoading(true);
    // 画像取得
    const newImage = await fetchImage();
    // 画像の差し替え
    setImageUrl(newImage.url);
    // 読み込み中フラグを倒す
    setLoading(false);
  }
  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        one more cat!!
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};
export default IndexPage;

// サーバーで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url
    },
  };
};

type Image = {
  url: string;
};

// 猫の画像を取得する
const fetchImage = async (): Promise<Image> => {
  // エンドポイントから取得
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  // JSONに変換してオブジェクトとして取得
  const images = await res.json();
  console.log(images);
  return images[0];
}

// fetchImage().then((image) => {
//   console.log(image.alt);
// });