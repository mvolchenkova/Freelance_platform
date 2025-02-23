import '../Vacancies/Vacancies.css'
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
            </div>
            <div>

            </div>
        </main>
           
        </>
    )
}