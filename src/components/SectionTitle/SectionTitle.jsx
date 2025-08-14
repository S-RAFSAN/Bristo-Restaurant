const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto md:w-4/12 text-center my-12">
            <p className="text-lg text-[#FA9541] mb-4">--- {subHeading} ---</p> 
            <h3 className="text-3xl font-semibold border-y-2 border-[#FA9541] py-4">{heading}</h3> 
        </div>
    );
};

export default SectionTitle;