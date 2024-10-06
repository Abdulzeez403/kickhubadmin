import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ProductCardProps } from "./modal";
import DataTableRowActions from "./table/dataRowAction";
import { DataTableColumnHeader } from "@/app/(components)/table/colunm";

interface IProps {
  onEdit: (value: ProductCardProps) => void;
  onDelete: (value: ProductCardProps) => void;
  onView: (value: ProductCardProps) => void;
}

export const columns = ({
  onEdit,
  onDelete,
  onView,
}: IProps): ColumnDef<ProductCardProps, unknown>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "images",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Images" />
    ),
    cell: ({ row }) => {
      const images = row.original.images;

      // Ensure the image array is valid
      if (!Array.isArray(images) || images.length === 0) {
        return <span>No Image</span>; // Display fallback if no images are available
      }

      // Use the first full URL directly
      const imageUrl = images[0];

      return (
        <div className="flex space-x-2">
          <Image
            src={imageUrl}
            alt={`Product image for ${row.original.name}`}
            width={50}
            height={50}
            className="rounded"
            unoptimized
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.original.description}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{row.original.price}</div>,
  },
  {
    accessorKey: "oldPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Old Price" />
    ),
    cell: ({ row }) => <div>{row.original.oldPrice}</div>,
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row }) => <div>{row.original.discount}</div>,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
      />
    ),
    size: 50,
  },
];
