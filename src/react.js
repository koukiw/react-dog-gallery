import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  
  const EffectFunc = () => {
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
          <Button onClick={()=>reloadImages(name.LastName)}>
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
  
  export default EffectFunc