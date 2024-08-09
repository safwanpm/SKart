import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import axios from "axios";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Category() {
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [offers] = useState(["0-10", "10-20", "20-50", "50+"]);
  const [selectedOffers, setSelectedOffers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4005/user/viewAllProducts")
      .then((res) => {
        console.log("response view allProducts", res);
        const products = res.data.data;
        setData(products);

        // Extract unique categories, brands, and subcategories
        const uniqueCategories = [
          ...new Set(products.map((product) => product.category)),
        ];

        const uniqueBrands = [
          ...new Set(products.map((product) => product.brand)),
        ];
        const uniqueSubcategories = [
          ...new Set(products.map((product) => product.subcategory)),
        ];

        setCategories([
          { id: null, name: "All Products", href: "#" }, // All Products option
          ...uniqueCategories.map((category, index) => ({
            id: index,
            name: category,
            href: `#`,
          })),
        ]);
        setBrands(
          uniqueBrands.map((brand, index) => ({ id: index, name: brand }))
        );
        setSubcategories(
          uniqueSubcategories.map((subcategory, index) => ({
            id: index,
            name: subcategory,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "All Products" ? null : category);
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brandId)
        ? prevSelectedBrands.filter((id) => id !== brandId)
        : [...prevSelectedBrands, brandId]
    );
  };

  const handleSubcategoryChange = (subcategoryName) => {
    setSelectedSubcategories((prevSelectedSubcategories) =>
      prevSelectedSubcategories.includes(subcategoryName)
        ? prevSelectedSubcategories.filter((name) => name !== subcategoryName)
        : [...prevSelectedSubcategories, subcategoryName]
    );
  };
  const handleOfferChange = (offer) => {
    setSelectedOffers((prevSelectedOffers) =>
      prevSelectedOffers.includes(offer)
        ? prevSelectedOffers.filter((o) => o !== offer)
        : [...prevSelectedOffers, offer]
    );
  };
  const filterProductsByOffers = (product) => {
    const offerPercent = product.offer;
    if (
      selectedOffers.includes("0-10") &&
      offerPercent >= 0 &&
      offerPercent < 10
    )
      return true;
    if (
      selectedOffers.includes("10-20") &&
      offerPercent >= 10 &&
      offerPercent < 20
    )
      return true;
    if (
      selectedOffers.includes("20-50") &&
      offerPercent >= 20 &&
      offerPercent < 50
    )
      return true;
    if (selectedOffers.includes("50+") && offerPercent >= 50) return true;
    return false;
  };

  const calculateAfterPrice = (price, offerPercent) => {
    const discount = (price * offerPercent) / 100;
    const afterPrice = Math.floor(price - discount); // Use Math.floor to remove decimal places
    return afterPrice.toString(); // Convert to string for display
  };
  return (
    <div className="bg-white">
      <div>
        <Transition show={mobileFiltersOpen}>
          <Dialog
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {categories.map((category, index) => (
                        <li key={category.id}>
                          <a
                            className={classNames(
                              "block px-1 py-1",
                              selectedCategory === category.name ||
                                (selectedCategory === null && index === 0)
                                ? "bg-gray-800 text-white rounded-lg"
                                : "text-gray-900 hover:bg-gray-600 hover:text-white rounded-lg"
                            )}
                            href={category.href}
                            onClick={() => handleCategoryClick(category.name)}
                          >
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Brand
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {brands
                                .filter((brand) =>
                                  data.some(
                                    (product) =>
                                      (!selectedCategory ||
                                        product.category ===
                                          selectedCategory) &&
                                      product.brand === brand.name
                                  )
                                )
                                .map((brand, idx) => (
                                  <div
                                    key={brand.id}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-brand-${idx}`}
                                      name="brand[]"
                                      value={brand.id}
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onChange={() =>
                                        handleBrandChange(brand.id)
                                      }
                                      checked={selectedBrands.includes(
                                        brand.id
                                      )}
                                    />
                                    <label
                                      htmlFor={`filter-brand-${idx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {brand.name}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Offers
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {offers.map((offer, idx) => (
                                <div key={idx} className="flex items-center">
                                  <input
                                    id={`filter-offer-${idx}`}
                                    name="offer[]"
                                    value={offer}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={() => handleOfferChange(offer)}
                                    checked={selectedOffers.includes(offer)}
                                  />
                                  <label
                                    htmlFor={`filter-offer-${idx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {offer}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="pt-2 relative text-gray-600">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none w-full max-w-xs"
                type="search"
                name="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-1 mr-2 sm:mt-5 sm:mr-4"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: "new 0 0 56.966 56.966" }}
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {categories.map((category, index) => (
                    <li key={category.id} className="text-md">
                      <a
                        className={classNames(
                          "block px-2",
                          selectedCategory === category.name ||
                            (selectedCategory === null && index === 0)
                            ? "bg-gray-800 text-white rounded-lg p-2"
                            : "text-gray-900 p-2 hover:bg-gray-600 hover:text-white rounded-lg"
                        )}
                        href={category.href}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Brands
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {brands
                            .filter((brand) =>
                              data.some(
                                (product) =>
                                  (!selectedCategory ||
                                    product.category === selectedCategory) &&
                                  product.brand === brand.name
                              )
                            )
                            .map((brand, idx) => (
                              <div key={brand.id} className="flex items-center">
                                <input
                                  id={`filter-brand-${idx}`}
                                  name="brand[]"
                                  value={brand.id}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={() => handleBrandChange(brand.id)}
                                  checked={selectedBrands.includes(brand.id)}
                                />
                                <label
                                  htmlFor={`filter-brand-${idx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {brand.name}
                                </label>
                              </div>
                            ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Offers
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {offers.map((offer, idx) => (
                            <div key={idx} className="flex items-center">
                              <input
                                id={`filter-offer-${idx}`}
                                name="offer[]"
                                value={offer}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={() => handleOfferChange(offer)}
                                checked={selectedOffers.includes(offer)}
                              />
                              <label
                                htmlFor={`filter-offer-${idx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {offer}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data
                    .filter((product) =>
                      selectedCategory
                        ? product.category === selectedCategory
                        : true
                    )
                    .filter((product) =>
                      selectedBrands.length > 0
                        ? selectedBrands.includes(
                            brands.find((brand) => brand.name === product.brand)
                              ?.id
                          )
                        : true
                    )
                    .filter((product) =>
                      selectedOffers.length > 0
                        ? selectedOffers.some((offer) =>
                            filterProductsByOffers(product)
                          )
                        : true
                    )
                    .filter((product) => 
                      product.name.toLowerCase().includes(search.toLowerCase()) ||
                      product.category.toLowerCase().includes(search.toLowerCase())
                    )
                    
                    .map((product, index) => (
                      <div key={index}>
                        <a href={`/product/${product._id}`}>
                          <div className="relative w-full h-64 flex items-center justify-center shadow-md">
                            <img
                              className="max-h-full max-w-full h-auto w-auto mx-auto hover:shadow-lg"
                              src={`/uploads/${product.images[0]}`}
                              alt={product.name}
                            />
                          </div>
                          <div className="pt-3 flex items-center justify-between">
                            <p>{product.name}</p>
                            <svg
                              className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>
                          </div>
                          <p className="pt-1 text-gray-900">
                            <del className="text-sm">£{product.price}</del>{" "}
                            <span className="text-lg">
                              £
                              {calculateAfterPrice(
                                product.price,
                                product.offer
                              )}
                            </span>{" "}
                          </p>
                        </a>
                      </div>
                    ))}
                 
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
