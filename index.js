import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';

const app = express();
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), ()=>{
    console.log('Estoy en el puerto '+app.get('port'))
})


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
