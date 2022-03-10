export async function fetchImages(breed,count) {
  console.log(breed)
  console.log("を")
  console.log(count)
  console.log("枚取得します");
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/${count}`
  );

  const data = await response.json();
  //ここもフォーム送信で表示される
  console.log(JSON.stringify(data))
  return data.message;
}