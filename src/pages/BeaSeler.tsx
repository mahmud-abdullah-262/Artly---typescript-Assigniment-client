import { Button, Form, Input, Label, TextArea, TextField, toast } from "@heroui/react";
import { useCurrentSession } from "../../lib/action/useCurrentSession";
import { Check } from "lucide-react";
import { serverMutate } from "../../lib/action/core/serverMutet";
import { useServerFetch } from "../../lib/action/core/useServerFetch";
import ArtistProfile from "../components/ArtistProfile";


const BeaSeler = () => {
  
   const { user, isPending } = useCurrentSession();
   console.log(user, 'user')
    const {data:artistProfile} = useServerFetch(`/api/artist/${user?.id}`)


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
  
    console.log(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    const result = await serverMutate('/api/artist', data, 'POST' )
    if(result){
      toast.success('data successfully inserted')
    }else{
      toast.danger(result.message)
    }
  };

 
  if (isPending) {
    return <p className="text-center p-8 text-text-muted">Loading...</p>;
  }


  if (!user) {
    return <p className="text-center p-8 text-text-muted">You need to sign in to become a seller.</p>;
  }

  if(artistProfile){
    return (
     <ArtistProfile></ArtistProfile>
    )
  }

  return (
  
    <div className="flex min-h-screen items-center justify-center bg-bg-light p-4 md:p-8">
   
      <div className="w-full max-w-4xl rounded-2xl border border-border bg-bg-card p-6 shadow-xl md:p-10">

   
        <h1 className="mb-6 text-3xl font-serif text-text-dark md:text-4xl md:mb-10">
          Be A seller
        </h1>

      
        <Form className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8 md:gap-y-8" onSubmit={onSubmit}>
          <input type="hidden" name='artistId' value={user?.id} />

         
          <TextField isDisabled className="w-full" name="accountId" defaultValue={user?.email}>
            <Label className="text-text-muted font-semibold">Email</Label>
            <Input defaultValue={user?.email} className="rounded-xl border border-border focus:border-accent" />
          </TextField>

        
          <TextField isRequired className="w-full" name="name" type="text" defaultValue={user?.name ?? "" }>
            <Label className="text-text-muted font-semibold">Name</Label>
            <Input placeholder="Enter your full name" className="rounded-xl border border-border focus:border-accent"/>
          </TextField>

        
          <TextField isRequired className="w-full" name="image" type="text" defaultValue={user?.image ?? "" }>
            <Label className="text-text-muted font-semibold">Image URL</Label>
            <Input placeholder="Enter image URL" className="rounded-xl border border-border focus:border-accent"/>
          </TextField>

        
          <TextField isRequired className="w-full" name="location" type="text">
            <Label className="text-text-muted font-semibold">Location</Label>
            <Input placeholder="Enter your location" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

         
          <div className="col-span-1 md:col-span-2">
            <Label className="text-text-muted font-semibold">Bio</Label>
            <TextArea
              required
              name="bio"
              aria-label="Bio"
              className="h-40 w-full rounded-2xl border border-border p-4 focus:border-accent"
              placeholder="Write Your Bio"
            />
          </div>

        
          <div className="flex  col-span-1 gap-4 md:col-span-2 md:mt-6">
            <Button type="submit" className="w-full rounded-full bg-primary py-3 text-lg text-bg-light font-medium">
              <Check className="w-5 h-5" />
              Submit
            </Button>
            <Button type="reset" variant="secondary" className="w-full rounded-full bg-primary py-3 text-lg text-bg-light font-medium">
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BeaSeler;