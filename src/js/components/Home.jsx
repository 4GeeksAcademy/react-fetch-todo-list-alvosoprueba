
import React, { useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {

	const [tareas, setTareas] = useState([]);
	const [nuevaTarea, setNuevaTarea] = useState("");
	const [borrarBoton, setBorrarBoton] = useState (null);
    
	
	function entrada(evento){
       setNuevaTarea(evento.target.value);
	}

	function usuario(){
			fetch("https://playground.4geeks.com/todo/users/yoalvarado25", {
				method: "GET"
			})
			.then((response) => {
				if (response.status === 404) {
					return fetch("https://playground.4geeks.com/todo/users/yoalvarado25", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify([])
					});
				} else {
					return Promise.resolve();
				}
			})
			.then(() => {
				console.log("Usuario creado");
			})
			.catch((error) => console.error("Error al crear usuario:", error));
		}
	

	function traerTareas(){
		fetch("https://playground.4geeks.com/todo/users/yoalvarado25",{
			method:"GET"
			})
			.then((response)=>response.json())
			.then((data)=>setTareas(data.todos))
			.catch((error)=>console.log(error))
	}

	function inputEnter(e){
		if (e.key === "Enter" && nuevaTarea.trim() !== "") {
			const newTask={label: nuevaTarea, done: false};
			fetch("https://playground.4geeks.com/todo/todos/yoalvarado25",{
				method:"POST",
                body: JSON.stringify(newTask),
                headers: {"Content-Type": "application/json" }
				})
				.then((response)=>response.json())
				.then((data)=> {
					if (data && data.id){
						setTareas([...tareas, data]);
					} setNuevaTarea("");
				})
				.catch((error)=>console.log(error))
		};
		}
	
		function borrarTarea(id) {
			fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
			})
				.then((response) => {
					if (response.ok) {
						setTareas(tareas.filter(tarea => tarea.id !== id));
					} else {
						console.error("Error al borrar tarea");
					}
				})
				.catch((error) => console.error(error));
		}

	
	

	function tareasActivas (){
		return tareas.length;
	}

	useEffect(() => {
	    usuario()
		traerTareas()
	 }, [])


	return (
	 <div className="fondo d-flex justify-content-center">
	 	<div className="form text-center font-monospace fs-1 mt-5" style={{width: "700px"}}>
	 	<label htmlFor="tareaInput" className="estilo" >Tareas</label>
	 		<input 
	 		type="tareaInput" 
	 		className="form-control" 
	 		value={nuevaTarea}  
	 		placeholder="Añade una tarea" 
	 		onChange={entrada} 	
	 		onKeyDown={inputEnter}/>	

                <ul className="bg-light-subtle" style={{width: "700px"}}>
				{tareas.map((tarea)=> 
				<li className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom rounded-3" id="homework" key={tarea.id} onMouseEnter={()=>setBorrarBoton(tarea.id)} onMouseLeave={() =>setBorrarBoton(null)}> 
				<span className="text">
				<i className="bi bi-check-circle me-2 fs-4 text-success"></i>{tarea.label}</span>
				{borrarBoton === tarea.id && (
				<button type="button" class="btn btn-light" onClick={()=>borrarTarea(tarea.id)}>
				<i className="bi bi-clipboard-x"></i> 
				</button> )}
				</li>)}
				<span className="d-flex justify-content-start fs-5 text-secondary">{tareasActivas()} tareas</span>
			    </ul>
			</div>
		
		</div>
	);
};

export default Home;