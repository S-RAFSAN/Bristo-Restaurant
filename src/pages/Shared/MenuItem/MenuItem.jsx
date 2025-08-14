
const MenuItem = ({item}) => {
    const {name, image, price, recipe} = item;
    return (
        <div className="flex space-x-4">
            <img className="w-1/3" style={{borderRadius: '0 200px 200px 200px'}} src={image} alt="" />
            <div>
                <h3 className="text-3xl">{name}</h3>
                <p>{recipe}</p>
                <p className="text-2xl text-[#FA9541]">${price}</p>
            </div>
        </div>
    );
};

export default MenuItem;