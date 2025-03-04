import '../Vacancies/Vacancies.css'
<<<<<<< HEAD
export default function Vacancies(){
    return(
        <>
            <div className="sortDiv">
                <div>
                    <p>Recomendation</p>
                    <p>38 product designer Jobs in United States</p>
                </div>
                <div>
                    <p>Sort by:</p>
                </div>
=======
import SelectSmall from '../../materialuiComponents/selectButton'
export default function Vacancies(){
    return(
        <>
        <main className='candidates'>
            <div className="sortDiv">
                    <div>
                        <p className='title-recomend'>Recomendation</p>
                        <p>38 product designer Jobs in United States</p>
                    </div>
                    <div className='sorted-by'>
                        <p>Sort by:</p>
                        <SelectSmall/>
                    </div>
>>>>>>> 8084a7f7ef9f32e816149dee2cadad555546f378
            </div>
            <div>

            </div>
<<<<<<< HEAD
=======
        </main>
           
>>>>>>> 8084a7f7ef9f32e816149dee2cadad555546f378
        </>
    )
}