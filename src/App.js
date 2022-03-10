import React, {useState, useEffect} from 'react'
import { fetchImages } from "./api";
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';


function Header() {
    return (
      <header className="hero is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">犬の画像ギャラリーだよ</h1>
          </div>
        </div>
      </header>
    );
}
  
function Image(props) {
    return (
        <div className="card">
        <div className="card-image">
            <figure className="image">
            <img src={props.src} alt="cute dog!" />
            </figure>
        </div>
        </div>
    );
}

function Loading() {
    return <p>Loading...</p>;
}
  
  
function Gallery(props) {
    //urlsに{}が付いてんの、props.urlsじゃないの、Imageではprops.srcで子コンポーネントに変数渡してるじゃん
    const { urls } = props;
    if(urls  == null){
        return <Loading />;
    }
    return (
        <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
            return (
            <div key={url} className="column is-3">
                <Image src={url} />
            </div>
            );
        })}
        </div>
    );
}

function EffectFunc(props){
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  const [count, setCount] = useState(0)
  const [name, setName] = useState({
    lastName: '',
  })
  useEffect(() => {
    document.title =`${count}枚の画像を表示しています`
  },[count])
  //Inputのフォームの書き方を調べる

  return (
    <>
      <p>{`${count}枚表示します`}</p>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={()=>setCount((prev) => prev + 1)}>
          ボタン
        </Button>
        <Button onClick={()=>setCount(0)}>
          リセット
        </Button>
        <Button onClick={()=>props.onSubmit(name.lastName,count)}>
          実行
        </Button>
      </ButtonGroup>
      <p>{`表示する犬種類は${name.lastName}です`}</p>
      <form className={classes.root} noValidate autoComplete="off">
        <Input
          placeholder="Shiba"
          value={name.lastName}
          onChange={(e)=>{setName({...name,lastName: e.target.value})}}/>
      </form>
    </>
  )
}


function Form(props) {
    function handleSubmit(event) {
      //event.preventDefault()がないとページリロードしたときにリセットされてた(デフォルト設定のshibaの画像が出る)つまり、
      //これを置くことでこの状態をデフォルトと設定し直しているのかも
      //event.preventDefault(), event.target.elementsの挙動の調査
      event.preventDefault();
      const { breed } = event.target.elements;
      //ここはformのボタン押した時に表示されてた、ページリロードではでない
      console.log("breed.value")
      console.log(breed.value)
      props.onFormSubmit(breed.value,12);
    }
    
    return (
      <div>
        <form onSubmit ={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="breed" defaultValue="shiba">
                  <option value="shiba">Shiba</option>
                  <option value="akita">Akita</option>
                  <option value="husky">husky</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
    
}
  
function Main() {
    const [urls, setUrls] = useState(null);
    //useEffectは第二引数に空配列を与えると、最初の画面レンダリングの後のみ実行される
    useEffect(() => {
        fetchImages("shiba",12).then((urls) => {
            setUrls(urls);
        });
    }, []);

    function reloadImages(breed,count) {
        fetchImages(breed,count).then((urls) => {
          setUrls(urls);
          console.log("urls")
          console.log(urls)
        });
    }
    
    return (
        <main>
            <section className="section">
                <div className="container">
                <EffectFunc onSubmit ={reloadImages}/>
                <Form onFormSubmit={reloadImages} />
                </div>
            </section>
        <section className="section">
            <div className="container">
            <Gallery urls = {urls}/>
            </div>
        </section>
        </main>
    );
}
  
function Footer() {
    return (
        <footer className="footer">
        <div className="content has-text-centered">
            <p>Dog images are retrieved from Dog API</p>
            <p>
            <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
            </p>
        </div>
        </footer>
    );
}
  
function App() {
    return (
        <div>
        <Header />
        <Main />
        <Footer />
        </div>
    );
}
  
export default App;