import { Container, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function FormularioGenerico(props: FormularioGenericoProps) {
return (
    <Container
      maxWidth="sm"
      style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
        {props.title}
      </Typography>
      {props.children}
      
    </Container>)
}
interface FormularioGenericoProps{
    children:ReactElement;
    title:String;
}