import React, {useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {Company, Contact} from '@/types/generated';
import EntityForm, {ICompany, IContact} from '@/form/EntityForm';
import {CompanyFormData, ContactFormData} from '@/types/forms';
import {LocalEntityType} from '@/constant/entities';

interface AccordionListProps {
    entityType: LocalEntityType;
    rowData: ICompany[] | IContact[];
    columnDefs: ColDef[];
    onAddEntity: (entityType: LocalEntityType, formData: CompanyFormData | ContactFormData) => void;
    onRowClicked: (rowData: ICompany | IContact, entityTypeClicked: LocalEntityType) => void;
}

const AccordionList: React.FC<AccordionListProps> = ({ entityType, rowData, columnDefs, onAddEntity, onRowClicked }) => {
  const isCompany = entityType === LocalEntityType.COMPANY;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddEntity = (formData: CompanyFormData | ContactFormData) => {
    onAddEntity(entityType, formData);
    setIsDialogOpen(false);
  };

  return (
    <AccordionItem value={`${entityType.toLowerCase()}-list`}>
      <AccordionTrigger className={'bg-blue-primary rounded-t-lg text-white font-bold p-4 uppercase hover:no-underline'}>
        {isCompany ? 'List of Companies' : 'List of Contacts'}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex justify-end items-center my-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className={'bg-blue-primary shadow-lg hover:scale-105 hover:bg-blue-light mr-4 duration-300 transition text-white'}>
                                Add {isCompany ? 'Company' : 'Contact'}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className={'mb-6'}>Add {isCompany ? 'Company' : 'Contact'}</DialogTitle>
              <EntityForm entityType={entityType} onSubmit={(formData) => handleAddEntity( formData)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="ag-theme-quartz h-[400px] w-full">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onRowClicked={({ data }) => onRowClicked(data, entityType)}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionList;
