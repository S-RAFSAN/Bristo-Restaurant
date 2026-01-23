
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {

  const [menu, loading, refetch, error] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  if (loading) {
    return (
      <section className="mb-12">
        <SectionTitle 
        heading="From Our Menu" 
        subHeading="Popular Items" 
        />
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12">
        <SectionTitle 
        heading="From Our Menu" 
        subHeading="Popular Items" 
        />
        <div className="col-span-2 text-center py-8">
          <p className="text-red-500 mb-4">Error loading menu: {error.message || 'Failed to connect to backend'}</p>
          <button onClick={() => refetch()} className="btn btn-primary">Retry</button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <SectionTitle 
      heading="From Our Menu" 
      subHeading="Popular Items" 
      />
      <div className="grid md:grid-cols-2 gap-10">
        {popular.length > 0 ? (
          popular.map((item) => (
            <MenuItem key={item._id} 
            item={item} />
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-500">No popular items available. Please check your backend connection.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularMenu;
