import { ReactNode } from 'react';
import { LabelTagColor } from '../LabelTag/LabelTag';
import { StatusTagVariant } from '../StatusTag/StatusTag';

export interface ExpenseTag {
    label: string;
    icon?: ReactNode;
    color?: LabelTagColor;
    iconColor?: string;
}
/** Pre-populated form field values. All fields are optional. */
export interface ExpenseModalInitialData {
    title?: string;
    date?: string;
    category?: string;
    paymentInstrument?: string;
    country?: string;
    amount?: string;
    currency?: string;
    billable?: boolean;
    reimburse?: boolean;
    credit?: boolean;
    vat?: string;
    vatPct?: string;
    report?: string;
    description?: string;
}
export interface ExpenseModalProps {
    /** Expense title shown in the modal header. Defaults to "Expense". */
    title?: string;
    /** Small label tags rendered next to the title. */
    tags?: ExpenseTag[];
    /** Status badge label. Defaults to "Draft". */
    statusLabel?: string;
    /** Status badge variant. Defaults to "neutral". */
    statusVariant?: StatusTagVariant;
    /** Show the dismissible info banner above the form. */
    showBanner?: boolean;
    /** Info banner message body. */
    bannerMessage?: string;
    /**
     * Pre-populate form fields with existing expense data.
     * Pass a new object (or change the key prop) to reset the form.
     */
    initialData?: ExpenseModalInitialData;
    /** Called when the × close button is clicked. */
    onClose?: () => void;
    /** Called when Save is clicked. */
    onSave?: () => void;
    /** Called when the → navigate-next button is clicked. */
    onNext?: () => void;
    className?: string;
}
export declare const ExpenseModal: import('react').ForwardRefExoticComponent<ExpenseModalProps & import('react').RefAttributes<HTMLDivElement>>;
