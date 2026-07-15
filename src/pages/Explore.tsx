import { Card, Spinner, Select, ListBox, SearchField, Button } from "@heroui/react";
import { useServerFetch } from "../../lib/action/core/useServerFetch";

import { motion } from "framer-motion";

import { Link, useSearchParams } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";




  const sort:string[] = ['Featured', 'Newest', 'Oldest']

 const categories: {
    id: string;
    name: string;
    slug: string;
}[] = [
  {
    id: "",
    name: "all",
    slug: "",
  },
  {
    id: "painting",
    name: "Painting",
    slug: "painting",
  },
  {
    id: "sketch",
    name: "Sketch & Drawing",
    slug: "sketch-drawing",
  },
  {
    id: "digital-art",
    name: "Digital Art",
    slug: "digital-art",
  },
  {
    id: "photography",
    name: "Photography",
    slug: "photography",
  },
  {
    id: "sculpture",
    name: "Sculpture",
    slug: "sculpture",
  },

  {
    id: "calligraphy",
    name: "Calligraphy",
    slug: "calligraphy",
  },

  {
    id: "printmaking",
    name: "Printmaking",
    slug: "printmaking",
  },

  {
    id: "illustration",
    name: "Illustration",
    slug: "illustration",
  },

  {

    id: "mixed-media",
    name: "Mixed Media",
    slug: "mixed-media",
  },

  {

    id: "abstract",
    name: "Abstract Art",
    slug: "abstract-art",
  },

];



const Explore = () => {
const [searchParams, setSearchParams] = useSearchParams();



const currentPage = Number(searchParams.get("page")) || 1;
// const currentCategory = searchParams.get('category') || ''

 const paramsString = searchParams.toString()


  const { data, loading } = useServerFetch<any>(`/api/artworks?${paramsString}`);
  

  const { totalArtworks, size, page, result } = data || {};
  const products = result || [];


  const totalItems = totalArtworks || 0;
  const itemsPerPage = size; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const params = new URLSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

   setSearchParams( prev => {
    const newParams = new URLSearchParams(prev)
    newParams.set("page", newPage.toString())
    return newParams
   })
  };

  const handleCategory = (key : string) => {
   setSearchParams( prev => {
    const newParams = new URLSearchParams(prev)
    newParams.set("category", key.toString())
    newParams.set('page', "1")
    return newParams
   })
  }

  const handleSort = (key : string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.set('sortby', key.toString())
      newParams.set('page', "1")
      return newParams
    })
  }


  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  if(!data){
    return(
      <div className="w-full h-[60vh] flex justify-center items-center"><h1>Data did not found</h1></div>
    )
  }

 

 


  // মোশন অ্যানিমেশন কনফিগারেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  } as const ;



  return (
    <div className="w-11/12 mx-auto">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-baseline mb-8 border-b border-border pb-4">
        <div>
          <p className="text-md text-accent tracking-widest font-light">OUR PALLATE</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark tracking-wider">
          Artworks
        </h2>
        </div>
        </div>


{/* search and filter */}

<section className="flex flex-col md:flex-row gap-2 w-full justify-center items-center my-2">
    <SearchField name="search" className={'flex-1 border-transparent'}>
    
      <SearchField.Group className={'rounded-none border border-primary'}>
        <SearchField.SearchIcon />
        <SearchField.Input className="focus:outline-none focus:ring-0" placeholder="Search..." />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>

    <Select className="w-[256px]" placeholder="Category" onChange={(key) => handleCategory(key)}>
     
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>

{categories.map(
      category => <ListBox.Item id={category.id} textValue={category.name}>
          {category?.name}
            <ListBox.ItemIndicator />
          </ListBox.Item>
    )}

          

          
        </ListBox>
      </Select.Popover>
    </Select>

 <Select className="w-[256px]" placeholder="Sort By" onChange={(key) => handleSort(key)}>
  
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>

{sort.map(
      s => <ListBox.Item id={s} textValue={s}>
          {s}
            <ListBox.ItemIndicator />
          </ListBox.Item>
    )}

          

          
        </ListBox>
      </Select.Popover>
    </Select>
</section>




{/* content */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {products.map((art) => (
          <motion.div key={art?._id?.toString()} variants={cardVariants}>
            <Link to={`/explore/${art?._id}`} className="block group">
              <Card className="p-0  overflow-hidden rounded-none shadow-sm transition-all duration-300 group-hover:shadow-md">
                
              
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  <img
                    src={art?.images?.url || "/placeholder.jpg"}
                    alt={art?.title || "Artwork Image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* কার্ডের কন্টেন্ট এরিয়া */}
                <Card.Header className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <Card.Title className="text-xl font-serif font-semibold leading-tight mb-1 text-white">
                    {art.title}
                  </Card.Title>
                  <Card.Description className="text-sm text-gray-200/95">
                    {art.medium}
                  </Card.Description>
                </Card.Header>

              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>


       {/* নেভিগেশন বাটনসমূহ (HeroUI এর স্ট্যান্ডার্ড বাটন) */}
      <div className="flex justify-center items-center mx-auto  gap-2 ">
        <Button
          size="sm"
          variant="flat"
          isDisabled={currentPage === 1}
          onPress={() => handlePageChange(currentPage - 1)}
        >
          <CircleArrowLeft/>
        </Button>
        
        <span className="text-sm min-w-[80px] text-center">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          size="sm"
          variant="flat"
          isDisabled={currentPage === totalPages}
          onPress={() => handlePageChange(currentPage + 1)} // ক্লিক করলে পেজ নাম্বার চেঞ্জ হচ্ছে
        >
          <CircleArrowRight></CircleArrowRight>
        </Button>
      </div>
    </div>

    
  );
};

export default Explore;