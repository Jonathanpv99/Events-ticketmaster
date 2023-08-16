import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const Navbar = forwardRef(({onSearch}, ref) => {
    const [search, setSearch] = useState('');
  
    useEffect(() => {
        console.log('1010effect');
    }, [search, onSearch]);

    useImperativeHandle(ref, () =>({
        search,
    }));

    const handleInputChange = (evt) =>{

        setSearch(evt.target.value); //target.value accede a lo que escribe el usuario
    };
    const handleInputKeyDown = (evt) =>{
        //keyDown regresa la tecla que se esta precionando en este caso ocupamos el enter
        if (evt.key === 'Enter'){
            onSearch(search);
        }
    }
        return (
            <div ref={ref} style={{
              marginBottom:14,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '1.5rem'
            }}>
                <div style={{ flex:1, display: 'flex'}}>
                <p>Mi boletera</p>
                </div>
                <div style={{ flex:1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <input 
                    placeholder="Busca tu evento favorito"
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    value = {search}
                    style={{
                        border: 'none',
                        borderRadius: 4,
                        fontSize: 16,
                    }}>
                </input>
                </div>
            </div>
        );
});

Navbar.displayName = 'Navbar';
export default Navbar;