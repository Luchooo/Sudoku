window.onload = function()
{
        sudoku      = [],
        solve       = [],
        dimension   = 2,
        dificultad  = 1;

       

    //Para cargar los combos...
    var select = nom_div("opc_2");
    for (var i = 2; i<= 5; i++)
    {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

    /*
        Función en la cual llega lel valor escrito por el usaurio
        además de la posición del valor digitado en la mattriz...
        Se deberá validar si el número digitado cumple con la condición para estar en esa posición...
        1. Un número no puede repetirse en el mismo cuadrante...
        2. Un número no puede estar en la misma Fila.
        3. Un número no puede estar en la misma columna.
    */
    var validaSudoku = function(valor, id)
    {   
        
        var cont=1;
        var cont_fila=1;
        var cont_columna=1;
        var parteID  = id.split("_");
        //console.log(parteID);
        //console.log(valor);
        //console.log(id);
        var tamano_sudoku=0;

        if (valor>0 && valor <= Math.pow(dimension,2)) 
            {
                 //$('#'+id).css('background-color', 'white');
                  //$('#'+id).removeClass('lol');
                
            for (var i = 0; i < dimension; i++) 
                {
                  for (var x = 0; x< dimension; x++) 
                    {     

                        if(sudoku[parteID[0]][i][parteID[2]][x]===valor)
                        {
                            cont_fila++;
                        }


                    };
                };


              for (var i = 0; i < dimension; i++) 
                {
                  for (var x = 0; x< dimension; x++) 
                    {     
                        if(sudoku[i][parteID[1]][x][parteID[3]]===valor)
                        {
                            cont_columna++;
                        } 
                    };
                };




                if (cont_fila>1) 
                    {
                       // console.log("El numero se repite en la fila");
                        for (var i = 0; i < dimension; i++) 
                            {
                              for (var x = 0; x< dimension; x++) 
                                {     
                                    $('#td_'+parteID[0]+"_"+[i]+"_"+parteID[2]+"_"+[x]).addClass('lol');
                                };
                            };
                    }

                else
                    {
                        for (var i = 0; i < dimension; i++) 
                            {
                              for (var x = 0; x< dimension; x++) 
                                {     
                                    $('#td_'+parteID[0]+"_"+[i]+"_"+parteID[2]+"_"+[x]).removeClass('lol');
                                };
                            };
                    }



                if (cont_columna>1) 
                    {
                        for (var i = 0; i < dimension; i++) 
                            {
                              for (var x = 0; x< dimension; x++) 
                                {     
                                    $('#td_'+[i]+"_"+[parteID[1]]+"_"+[x]+"_"+[parteID[3]]).addClass('lol');
                                };
                            };
                    }
                else
                    {
                        for (var i = 0; i < dimension; i++) 
                            {
                              for (var x = 0; x< dimension; x++) 
                                {     
                                    $('#td_'+[i]+"_"+[parteID[1]]+"_"+[x]+"_"+[parteID[3]]).removeClass('lol');
                                };
                            };
                    }
                        for (var i = 0; i < sudoku[parteID[0]][parteID[1]].length; i++) 
                        {

                            for (var x = 0; x < sudoku[parteID[0]][parteID[1]].length; x++) 
                            {

                                if(sudoku[parteID[0]][parteID[1]][i][x]===valor)
                                {
                                    cont++;

                                }
                              
                            };
                            
                        };


                        if (cont===1) 
                            {
                                sudoku[parteID[0]][parteID[1]][parteID[2]][parteID[3]]=valor;

                          //    console.log('#'+parteID[0]+"_"+parteID[1]); --> Cuadrante
                                $('#'+parteID[0]+"_"+parteID[1]).css('background-color', 'white');
                                 $('#'+id).removeClass('lol');
                                //console.log("El numero NO esta repetido");
                            }
                        if (cont>1) 
                            {
                                sudoku[parteID[0]][parteID[1]][parteID[2]][parteID[3]]="";  
                                $('#'+parteID[0]+"_"+parteID[1]).css('background-color', 'red');
                               // console.log("El numero ESTA REPETIDO");
                            };


                    }
           
            

            else
            {
                if (valor!=="") 
                    {
                        swal("EL valor no es valido");
                        $('#'+id).addClass('lol');
                    };

                
            }
    


  ////////////***********Validar******//////////////////    
    for (var i = 0, q=0 ; i < solve.length; i++,q++) 
    {
        for (var a = 0, j=0; a < solve.length; a++,j++) 
        {
            for (var z = 0, c=0; z < dimension; z++,c++) 
            {
                 for (var y = 0, f=0; y < dimension; y++,f++) 
                    {
                        if(solve[i][a][z][y]===sudoku[q][j][c][f])
                        {
                            tamano_sudoku++;
                            
                        }
                    };
            };
            
        };
    };

    console.log(tamano_sudoku);
   if (tamano_sudoku===(Math.pow(dimension*dimension,2))) 
    {
        swal
        ({   
            title: "!!Congratulations!!",   
            text: "Sudoku Resuelto",
            imageUrl: "img/like.ico",   
            timer: 3000,   
            showConfirmButton: false 
        });

    };
 ///////////////////////////////////////////////   

    }

    var nuevoSudoku = (function nuevoSudoku()
    {
        var newSudoku = sudokuJS.creaSudoku(dimension, dificultad);
        sudoku = newSudoku.sudokujs;
        solve = newSudoku.respuesta;
        //Para dibujar el sudoku en html...
        var txt     = "<table>",
            nomID   = "";
            eventos = [];
        for(var fila = 0; fila < sudoku.length; fila++)
        {
            txt += "<tr>";
            for(var col = 0; col < sudoku.length; col++)
            {
                txt += "<td>";
                txt += "<table class = 'cuadrante' id = '"+fila+"_"+col+"'>"
                for(var i = 0; i < sudoku.length; i++)
                {
                    txt += "<tr>";
                    for(var c = 0; c < sudoku.length; c++)
                    {
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        txt += "<td class = 'interno' id = 'td_"+(nomID)+"'>"
                        if(sudoku[fila][col][i][c] !== 0)
                        {
                            txt += sudoku[fila][col][i][c];
                        }
                        else
                        {
                            txt += "<input type = 'text' class = 'numero' id = '"+(nomID)+"' maxlength = '1'>";
                            eventos.push(nomID);
                        }
                        txt += "</td>";
                    }
                    txt += "</tr>";
                }
                txt += "</table>";
            }
            txt += "</tr>";
        }
        txt += "</table>";
        nom_div("escenario").innerHTML = txt;
        for(var i = 0; i < eventos.length; i++)
        {
            nom_div(eventos[i]).addEventListener("keyup", function(event)
            {
                if(isNumber(this.value) || this.value === "")
                {
                    validaSudoku(this.value === "" ? 0 : Number(this.value), this.id);
                }
                else
                {
                    this.value = "";
                }
            });
        }
        //Fin de dibujar el sudoku...
        return nuevoSudoku;
    })();

    nom_div("resuelve").addEventListener('click', function(event)
	{
		//console.log(event);
        //Para completar los campos del sudoku...
        //resuelve
        var nomID = "";
        for(var fila = 0; fila < solve.length; fila++)
        {
            for(var col = 0; col < solve.length; col++)
            {
                for(var i = 0; i < solve.length; i++)
                {
                    for(var c = 0; c < solve.length; c++)
                    {
                        //Saber si el input existe para completar el espacio...
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        if(nom_div(nomID) !== null)
                        {
                            nom_div(nomID).value = solve[fila][col][i][c];
                        }
                    }
                }
            }
        }
	});

    nom_div("nuevo").addEventListener('click', function(event)
    {
        nuevoSudoku();
    });

    for(var combo = 1; combo <= 2; combo++)
    {
        nom_div("opc_" + combo).addEventListener('change', function(event)
        {
            var numOpc = Number(this.id.split("_")[1]);
            if(numOpc === 1)
            {
                if(Number(this.value) !== 0)
                {
                    dificultad = Number(this.value);
                }
            }
            else
            {
                if(Number(this.value) !== 0)
                {
                    dimension = Number(this.value);
                }
            }
            nuevoSudoku();
        });
    }

    function isNumber(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function nom_div(div)
	{
		return document.getElementById(div);
	}
};
