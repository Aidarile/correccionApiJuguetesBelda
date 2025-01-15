export interface ApiResponseJuguetes {
    juguetes: Juguetes
  }
  
  export interface Juguetes {
    info: Info
    juguetes: Juguete[]
  }
  
  export interface Info {
    total: number
    pages: number
  }
  
  export interface Juguete {
    _id: string
    nombre: string
    imagen: string
    categoria: string
    edadMinima: number
    precio: number
  }
  