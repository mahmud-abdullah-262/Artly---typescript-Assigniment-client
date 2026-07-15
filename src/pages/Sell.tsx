import {
  Button, Form, Input, Label, TextArea, TextField,
  Select, ListBox, Checkbox, toast
} from "@heroui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCurrentSession } from "../../lib/action/useCurrentSession";
import { Check, UserPlus, ChevronDown } from "lucide-react";
import { serverMutate } from "../../lib/action/core/serverMutet";
import { useServerFetch } from "../../lib/action/core/useServerFetch";
import type { Artist } from "../../lib/types/Artist";

const CATEGORIES = ["abstract", "portrait", "landscape", "still-life", "sculpture", "digital", "photography"];
const STATUS_OPTIONS = ["available", "sold", "reserved"];
const CURRENCIES = ["BDT", "USD"];
const TRUST_BADGES = ["authentic_certified", "archival_packaging", "insured_delivery"];

const Sell = () => {
  const { user, isPending } = useCurrentSession();
  const { data: artistProfile, loading: profilePending } = useServerFetch<Artist>(`/api/artist/${user?.id}`);

  const [category, setCategory] = useState<string>("");
  const [currency, setCurrency] = useState<string>("BDT");
  const [status, setStatus] = useState<string>("available");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trustBadges = formData.getAll("trustBadges") as string[];

    const payload = {
      title: formData.get("title") as string,
      category,
      isFeatured: formData.get("isFeatured") === "on",
      images: {
        url: formData.get("imageUrl") as string,
        alt: formData.get("imageAlt") as string,
      },
      price: {
        amount: Number(formData.get("priceAmount")),
        currency,
      },
      status,
      medium: formData.get("medium") as string,
      dimensions: {
        cm: {
          width: Number(formData.get("widthCm")),
          height: Number(formData.get("heightCm")),
        },
        inches: {
          width: Number(formData.get("widthIn")),
          height: Number(formData.get("heightIn")),
        },
      },
      shipping: {
        shipsFrom: formData.get("shipsFrom") as string,
        estimatedDelivery: formData.get("estimatedDelivery") as string,
      },
      trustBadges,
      description: formData.get("description") as string,
      specs: {
        year: Number(formData.get("year")),
        edition: formData.get("edition") as string,
        surface: formData.get("surface") as string,
        framing: formData.get("framing") as string,
        certificate: formData.get("certificate") as string,
      },
      artist: {
        artistID: artistProfile?.artistId,
      },
    };
    console.log(payload, 'payload')
    try {
      const result = await serverMutate("/api/artwork",  payload, "POST");
      if (result) {
        toast.success("Artwork successfully submitted");
      } else {
        toast.danger("Something went wrong");
      }
    } catch  {
      toast.danger("Failed to submit artwork");
    }
  };

  if (isPending || profilePending) {
    return <p className="text-center p-8 text-text-muted">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center p-8 text-text-muted">You need to sign in to become a seller.</p>;
  }

  if (!artistProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light p-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-bg-card p-8 text-center shadow-xl">
          <UserPlus className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="mb-2 text-2xl font-serif text-text-dark">You Have No Artist Profile</h1>
          <p className="mb-6 text-text-muted">
          To sell artwork, you must first create your artist profile.
          </p>
          <Link
            to="/seller"
            className="inline-block w-full rounded-full bg-primary py-3 text-lg text-bg-light font-medium"
          >
            Create Artist Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-light p-4 md:p-8">
      <div className="w-full max-w-4xl rounded-2xl border border-border bg-bg-card p-6 shadow-xl md:p-10">
        <h1 className="mb-6 text-3xl font-serif text-text-dark md:text-4xl md:mb-10">
          List Your Artwork
        </h1>

        <Form className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8 md:gap-y-8" onSubmit={onSubmit}>
          <input type="hidden" name="artistId" value={artistProfile.artistId} />

          <TextField isRequired className="w-full" name="title" type="text">
            <Label className="text-text-muted font-semibold">Title</Label>
            <Input placeholder="e.g. Dance of Spirits" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          {/* Category Select - সঠিক anatomy অনুযায়ী */}
          <Select
            selectedKey={category}
            onSelectionChange={(key) => setCategory(String(key))}
            className="w-full"
            placeholder="Select a category" 
          >
            <Label className="text-text-muted font-semibold">Category</Label>
            <Select.Trigger className="rounded-xl border border-border px-4 py-2 flex items-center justify-between">
              <Select.Value />
              <Select.Indicator>
                <ChevronDown className="h-4 w-4" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {CATEGORIES.map((c) => (
                  <ListBox.Item key={c} id={c}>
                    <Label>{c}</Label>
                    <ListBox.ItemIndicator>
                      <Check className="h-4 w-4" />
                    </ListBox.ItemIndicator>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField isRequired className="w-full" name="imageUrl" type="text">
            <Label className="text-text-muted font-semibold">Image URL</Label>
            <Input placeholder="https://..." className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="imageAlt" type="text">
            <Label className="text-text-muted font-semibold">Image Alt Text</Label>
            <Input placeholder="e.g. Dance of Spirits abstract" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="priceAmount" type="number">
            <Label className="text-text-muted font-semibold">Price Amount</Label>
            <Input placeholder="13500" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          {/* Currency Select */}
          <Select
            selectedKey={currency}
            onSelectionChange={(key) => setCurrency(String(key))}
            className="w-full"
          >
            <Label className="text-text-muted font-semibold">Currency</Label>
            <Select.Trigger className="rounded-xl border border-border px-4 py-2 flex items-center justify-between">
              <Select.Value />
              <Select.Indicator>
                <ChevronDown className="h-4 w-4" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {CURRENCIES.map((c) => (
                  <ListBox.Item key={c} id={c}>
                    <Label>{c}</Label>
                    <ListBox.ItemIndicator>
                      <Check className="h-4 w-4" />
                    </ListBox.ItemIndicator>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Status Select */}
          <Select
            selectedKey={status}
            onSelectionChange={(key) => setStatus(String(key))}
            className="w-full"
          >
            <Label className="text-text-muted font-semibold">Status</Label>
            <Select.Trigger className="rounded-xl border border-border px-4 py-2 flex items-center justify-between">
              <Select.Value />
              <Select.Indicator>
                <ChevronDown className="h-4 w-4" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {STATUS_OPTIONS.map((s) => (
                  <ListBox.Item key={s} id={s}>
                    <Label>{s}</Label>
                    <ListBox.ItemIndicator>
                      <Check className="h-4 w-4" />
                    </ListBox.ItemIndicator>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField isRequired className="w-full" name="medium" type="text">
            <Label className="text-text-muted font-semibold">Medium</Label>
            <Input placeholder="e.g. Oil and resin layers on canvas" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="widthCm" type="number">
            <Label className="text-text-muted font-semibold">Width (cm)</Label>
            <Input className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="heightCm" type="number">
            <Label className="text-text-muted font-semibold">Height (cm)</Label>
            <Input className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="widthIn" type="number">
            <Label className="text-text-muted font-semibold">Width (inches)</Label>
            <Input className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="heightIn" type="number">
            <Label className="text-text-muted font-semibold">Height (inches)</Label>
            <Input className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="shipsFrom" type="text">
            <Label className="text-text-muted font-semibold">Ships From</Label>
            <Input placeholder="e.g. Dhaka, Bangladesh" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="estimatedDelivery" type="text">
            <Label className="text-text-muted font-semibold">Estimated Delivery</Label>
            <Input placeholder="e.g. 5-7 business days" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="year" type="number">
            <Label className="text-text-muted font-semibold">Year</Label>
            <Input placeholder="2026" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="edition" type="text">
            <Label className="text-text-muted font-semibold">Edition</Label>
            <Input placeholder="Original" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="surface" type="text">
            <Label className="text-text-muted font-semibold">Surface</Label>
            <Input placeholder="Stretched canvas" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="framing" type="text">
            <Label className="text-text-muted font-semibold">Framing</Label>
            <Input placeholder="Unframed" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <TextField isRequired className="w-full" name="certificate" type="text">
            <Label className="text-text-muted font-semibold">Certificate</Label>
            <Input placeholder="Certificate of authenticity included" className="rounded-xl border border-border focus:border-accent" />
          </TextField>

          <div className="col-span-1 md:col-span-2">
            <Label className="text-text-muted font-semibold">Description</Label>
            <TextArea
              required
              name="description"
              aria-label="Description"
              className="h-32 w-full rounded-2xl border border-border p-4 focus:border-accent"
              placeholder="Describe the artwork"
            />
          </div>

         <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4">
  {TRUST_BADGES.map((badge) => (
    <Checkbox key={badge} name="trustBadges" value={badge}>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        {badge.replace(/_/g, " ")}
      </Checkbox.Content>
    </Checkbox>
  ))}
</div>

          <div className="col-span-1 md:col-span-2">
            <Checkbox>
    <Checkbox.Content>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
    Feature this artwork
    </Checkbox.Content>
  </Checkbox>
      
          </div>

          <div className="flex col-span-1 gap-4 md:col-span-2 md:mt-6">
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

export default Sell;