import { format, parseISO } from 'date-fns';


function Card(props) {
    const { title, description, datetime, image } = props
    const parsedDate = parseISO(datetime);
    const formattedDate = format(parsedDate, 'd MMM yyyy');

    return <div>
        {/* Cards */}
        <div className="col-12 d-flex justify-content-center align-items-center mb-3">
            <div className="card" style={{ width: + 42 + 'rem' }}>
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-text text-success my-0">{formattedDate}</p>
                    <h5 className="card-title my-2">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    </div>;
}

export default Card;
